package com.atomicfi.transactreactnative

import android.content.Context
import android.util.Base64
import com.facebook.react.bridge.*
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.modules.core.DeviceEventManagerModule
import financial.atomic.transact.Config
import financial.atomic.transact.Transact
import financial.atomic.transact.receiver.TransactBroadcastReceiver
import java.lang.Exception
import java.util.concurrent.ConcurrentHashMap
import kotlinx.serialization.json.Json
import org.json.JSONObject

class TransactReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  // jsInstanceId -> receiver. Used only for instance-targeted commands (resolveDataRequest);
  // event routing is handled by each receiver's own envelope. Entries are dropped on cleanup.
  private val receivers = ConcurrentHashMap<String, TransactBroadcastReceiver>()
  private val json = Json { ignoreUnknownKeys = true }

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
            emitEnvelope(emitter, "onClose", instanceId, data)
          }

          override fun onFinish(data: JSONObject) {
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
            emitEnvelope(emitter, "onCleanup", instanceId, null)
            receivers.remove(instanceId)
          }
        }

        receivers[instanceId] = receiver
        Transact.present(context, sdkConfig, receiver)
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

  companion object {
    const val NAME = "TransactReactNative"
  }
}
