package com.atomicfi.transactreactnative

import android.app.Activity
import android.app.Application
import android.content.Context
import android.os.Bundle
import android.util.Base64
import com.facebook.react.bridge.*
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.common.LifecycleState
import com.facebook.react.modules.core.DeviceEventManagerModule
import financial.atomic.transact.Config
import financial.atomic.transact.PausedTransactRef
import financial.atomic.transact.Transact
import financial.atomic.transact.activity.TransactActivity
import financial.atomic.transact.receiver.TransactBroadcastReceiver
import java.lang.Exception
import java.util.concurrent.ConcurrentHashMap
import kotlin.coroutines.Continuation
import kotlin.coroutines.EmptyCoroutineContext
import kotlin.coroutines.startCoroutine
import kotlinx.serialization.json.Json
import org.json.JSONObject

class TransactReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  // jsInstanceId -> receiver. Used only for instance-targeted commands (resolveDataRequest);
  // event routing is handled by each receiver's own envelope. Entries are dropped on cleanup.
  private val receivers = ConcurrentHashMap<String, TransactBroadcastReceiver>()
  // jsPauseId -> paused session. A PausedTransactRef can't cross the bridge, so the JS ref names one
  // held here until it's resumed or its launch ends.
  private val pausedSessions = ConcurrentHashMap<String, PausedSession>()
  // The launch the SDK would pause: its most recently created Transact, which is the latest launch
  // here. Null once that launch closes, finishes or is hidden. The SDK would still pause it until
  // cleanup, and resuming would bring the closed or hidden session back.
  @Volatile private var pausableInstanceId: String? = null
  private val json = Json { ignoreUnknownKeys = true }

  private class PausedSession(val instanceId: String, val ref: PausedTransactRef)

  // The launch has closed, finished or cleaned up, so there's nothing left to pause or resume:
  // resuming would bring back a session that already reported its end. Called on the UI thread,
  // where launches set pausableInstanceId.
  private fun endPresentation(instanceId: String) {
    if (pausableInstanceId == instanceId) {
      pausableInstanceId = null
    }
    pausedSessions.values.removeAll { it.instanceId == instanceId }
  }

  // Runs [done] once the app's Activity is back in front, or after a short timeout. Pausing returns
  // while Transact's Activity is still finishing, and a dialog the app shows before then is dropped.
  private fun afterHostResumed(done: () -> Unit) {
    UiThreadUtil.runOnUiThread {
      if (reactApplicationContext.lifecycleState == LifecycleState.RESUMED) {
        done()
        return@runOnUiThread
      }
      var finished = false
      lateinit var listener: LifecycleEventListener
      val finish = {
        if (!finished) {
          finished = true
          reactApplicationContext.removeLifecycleEventListener(listener)
          done()
        }
      }
      listener = object : LifecycleEventListener {
        override fun onHostResume() = finish()

        override fun onHostPause() = Unit

        override fun onHostDestroy() = finish()
      }
      reactApplicationContext.addLifecycleEventListener(listener)
      UiThreadUtil.runOnUiThread({ finish() }, 2000)
    }
  }

  // Runs [done] once Transact's Activity is in front, or after a short timeout, unless the returned
  // function cancels it first. Call on the UI thread before resuming, so its start can't be missed.
  // Waiting for the app's Activity to pause isn't enough: that comes before TransactActivity is
  // created and can receive a pause.
  private fun afterTransactShown(done: () -> Unit): () -> Unit {
    val application = reactApplicationContext.applicationContext as Application
    var waiting = true
    lateinit var callbacks: Application.ActivityLifecycleCallbacks
    // True for the one call that stops the wait.
    val stop = {
      val stopped = waiting
      if (waiting) {
        waiting = false
        application.unregisterActivityLifecycleCallbacks(callbacks)
      }
      stopped
    }
    callbacks = object : Application.ActivityLifecycleCallbacks {
      override fun onActivityResumed(activity: Activity) {
        if (activity is TransactActivity && stop()) done()
      }

      override fun onActivityCreated(activity: Activity, savedInstanceState: Bundle?) = Unit

      override fun onActivityStarted(activity: Activity) = Unit

      override fun onActivityPaused(activity: Activity) = Unit

      override fun onActivityStopped(activity: Activity) = Unit

      override fun onActivitySaveInstanceState(activity: Activity, outState: Bundle) = Unit

      override fun onActivityDestroyed(activity: Activity) = Unit
    }
    application.registerActivityLifecycleCallbacks(callbacks)
    UiThreadUtil.runOnUiThread({ if (stop()) done() }, 2000)
    return { stop() }
  }

  override fun getName(): String {
    return NAME
  }

  override fun getConstants(): MutableMap<String, Any>? {
    val constants = mutableMapOf<String, Any>()

    constants["VERSION"] = BuildConfig.TRANSACT_VERSION

    return constants
  }

  private fun parseEnvironment(environmentData: ReadableMap): String {
    val environmentType = if (environmentData.hasKey("environment")) {
      environmentData.getString("environment")
    } else {
      "production"
    }

    return when (environmentType) {
      "production" -> "https://transact.atomicfi.com"
      "sandbox" -> "https://transact.atomicfi.com"
      "custom" -> {
        if (environmentData.hasKey("transactPath")) {
          environmentData.getString("transactPath") ?: "https://transact.atomicfi.com"
        } else {
          "https://transact.atomicfi.com"
        }
      }
      else -> "https://transact.atomicfi.com" // fallback to production
    }
  }

  // Every event is wrapped in a { instanceId, data } envelope so the JS layer can route it to the
  // task that owns `instanceId` (SDK-658). `data` is null for argument-less events (onLaunch).
  private fun emitEnvelope(
    emitter: DeviceEventManagerModule.RCTDeviceEventEmitter,
    eventName: String,
    instanceId: String,
    data: JSONObject?,
  ) {
    val envelope = JSONObject().apply {
      put("instanceId", instanceId)
      put("data", data ?: JSONObject.NULL)
    }
    emitter.emit(eventName, envelope.toString())
  }

  private fun buildConfigToken(config: ReadableMap, wrapperVersion: String): String {
    val configJson = JSONObject(config.toHashMap())
    val platformMap = Config.Platform.suffixed("react-$wrapperVersion").encode()
    configJson.put("platform", JSONObject(platformMap as Map<String, Any?>))
    return Base64.encodeToString(
      configJson.toString().toByteArray(Charsets.UTF_8),
      Base64.NO_WRAP,
    )
  }

  @ReactMethod
  fun presentTransact(
    instanceId: String,
    config: ReadableMap,
    environment: ReadableMap,
    wrapperVersion: String,
    setDebug: Boolean,
    promise: Promise,
  ) {
    val context = reactApplicationContext.currentActivity as? Context
    if (context == null) {
      promise.reject("no_activity", "No current Activity to present Transact from")
      return
    }
    val emitter = reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
    val environmentURL = parseEnvironment(environment)
    val token = buildConfigToken(config, wrapperVersion)
    val sdkConfig = Config(token = token, environment = "CUSTOM", environmentURL = environmentURL, debug = setDebug)

    UiThreadUtil.runOnUiThread {
      try {
        // Each launch gets its own receiver capturing this call's JS instanceId. The native SDK
        // binds its own per-instance id to the receiver and routes broadcasts so this receiver
        // only ever sees its own session's events (SDK-659). We re-tag each emit with the JS
        // instanceId so the JS registry can route to this task's handlers.
        val receiver = object : TransactBroadcastReceiver() {
          override fun onClose(data: JSONObject) {
            endPresentation(instanceId)
            emitEnvelope(emitter, "onClose", instanceId, data)
          }

          override fun onFinish(data: JSONObject) {
            endPresentation(instanceId)
            emitEnvelope(emitter, "onFinish", instanceId, data)
          }

          override fun onLaunch() {
            emitEnvelope(emitter, "onLaunch", instanceId, null)
          }

          override fun onInteraction(data: JSONObject) {
            emitEnvelope(emitter, "onInteraction", instanceId, data)
          }

          override fun onDataRequest(data: JSONObject) {
            emitEnvelope(emitter, "onDataRequest", instanceId, data)
          }

          override fun onAuthStatusUpdate(data: JSONObject) {
            emitEnvelope(emitter, "onAuthStatusUpdate", instanceId, data)
          }

          override fun onTaskStatusUpdate(data: JSONObject) {
            if (!data.has("failReason")) {
              data.put("failReason", JSONObject.NULL)
            }
            emitEnvelope(emitter, "onTaskStatusUpdate", instanceId, data)
          }

          override fun onDebugLog(
            level: String,
            tag: String,
            message: String,
            data: JSONObject
          ) {
            // Debug log is process-global (no per-task instanceId), like iOS.
            emitter.emit("onDebugLog", data.toString())
          }

          override fun onCleanup() {
            // Terminal (carries no data): the JS registry tears down this task here. Drop our
            // command-targeting ref.
            endPresentation(instanceId)
            emitEnvelope(emitter, "onCleanup", instanceId, null)
            receivers.remove(instanceId)
          }
        }

        receivers[instanceId] = receiver
        Transact.present(context, sdkConfig, receiver)
        pausableInstanceId = instanceId
        // Resolve as a launch ack. Lifecycle callbacks are delivered via the enveloped events above.
        promise.resolve(null)
      } catch (e: Exception) {
        receivers.remove(instanceId)
        promise.reject(e)
      }
    }
  }

  // Sends a data-request response back to the originating task. The JS layer calls this with the
  // wrapper instanceId; we resolve the SDK's per-instance id from the bound receiver and target it
  // so concurrent flows don't each receive the response.
  @ReactMethod
  fun resolveDataRequest(instanceId: String, response: ReadableMap?) {
    if (response == null) {
      return
    }
    val sdkInstanceId = receivers[instanceId]?.instanceId ?: return
    try {
      val responseJson = JSONObject(response.toHashMap()).toString()
      val dataResponse =
        json.decodeFromString(Config.TransactDataResponse.serializer(), responseJson)
      Transact.sendData(reactApplicationContext, sdkInstanceId, dataResponse)
    } catch (e: Exception) {
      // Malformed/empty response — nothing to deliver.
    }
  }

  // Hides, rather than closes, every presented session, like Atomic.hideTransact() on iOS: the
  // SDK's DISMISS broadcast carries no instanceId, and no onClose/onCleanup fires. That leaves
  // nothing on screen to pause, though the SDK would still pause the hidden session.
  @ReactMethod
  fun hideTransact(promise: Promise) {
    UiThreadUtil.runOnUiThread {
      pausableInstanceId = null
      Transact.hideTransact(reactApplicationContext)
      promise.resolve(null)
    }
  }

  // Pauses the latest launch's Transact, which is the one the SDK pauses (its most recent instance).
  // Transact.pauseTransact is a suspend function that moves to the main thread itself, so a bare
  // coroutine runs it; this keeps kotlinx-coroutines, a runtime-only dependency of the SDK, off our
  // compile classpath.
  @ReactMethod
  fun pauseTransact(pauseId: String, animated: Boolean, promise: Promise) {
    if (pausableInstanceId == null) {
      // Nothing launched, or the latest launch has closed or finished: rejected as iOS does.
      promise.reject("transact_not_presented", "No Transact is currently presented")
      return
    }

    suspend { Transact.pauseTransact(animated) }.startCoroutine(
      Continuation(EmptyCoroutineContext) { result ->
        result
          .onSuccess { ref ->
            // Read again on the main thread, in step with the receivers' callbacks: the launch may
            // have ended, or a newer one started, while the pause was in flight.
            val instanceId = pausableInstanceId
            if (instanceId == null) {
              promise.reject("transact_not_presented", "No Transact is currently presented")
              return@onSuccess
            }
            pausedSessions[pauseId] = PausedSession(instanceId, ref)
            // Resolve once Transact is gone, as on iOS.
            afterHostResumed { promise.resolve(null) }
          }
          .onFailure { e ->
            // The SDK raises one exception type for both failures, told apart by its message.
            val code = when (e.message) {
              "No Transact is currently presented" -> "transact_not_presented"
              "Transact is already paused" -> "transact_already_paused"
              else -> "pause_failed"
            }
            promise.reject(code, e.message, e)
          }
      }
    )
  }

  @ReactMethod
  fun resumeTransact(pauseId: String, animated: Boolean, promise: Promise) {
    if (!pausedSessions.containsKey(pauseId)) {
      promise.reject("no_paused_transact", "No paused Transact to resume")
      return
    }
    val activity = reactApplicationContext.currentActivity
    if (activity == null) {
      // Keep the session, so the app can resume once it has an Activity to present from.
      promise.reject("no_activity", "No current Activity to resume Transact from")
      return
    }
    // Taken here, on the module's thread, so a second resume of this ref finds it gone.
    val session = pausedSessions.remove(pauseId)
    if (session == null) {
      promise.reject("no_paused_transact", "No paused Transact to resume")
      return
    }

    UiThreadUtil.runOnUiThread {
      // Resolve once Transact is back, as on iOS, so pausing straight away can hide it again.
      val stopWaiting = afterTransactShown { promise.resolve(null) }
      try {
        session.ref.resume(activity, animated)
      } catch (e: Exception) {
        stopWaiting()
        pausedSessions[pauseId] = session
        promise.reject("resume_failed", e.message, e)
      }
    }
  }

  companion object {
    const val NAME = "TransactReactNative"
  }
}
