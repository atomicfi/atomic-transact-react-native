package com.atomicfi.appiumtestenvironment

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.Build
import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule

/**
 * Bridges the Appium conformance contract to JS.
 *
 * The suite launches this app with TRANSACT_* intent extras and broadcasts commands to
 * [TransactCommandReceiver]. Neither is visible to React Native on its own, so this module exposes
 * the launch extras, forwards new intents and commands as events, and writes log lines under the
 * `AppiumTestEnvironment` tag the suite's `waitForLogs` helper matches on.
 */
class AppiumHarnessModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext), LifecycleEventListener {

  companion object {
    const val TAG = "AppiumTestEnvironment"
    private const val EVENT_LAUNCH = "AppiumHarnessLaunch"
    private const val EVENT_COMMAND = "AppiumHarnessCommand"
  }

  private var commandReceiver: BroadcastReceiver? = null

  override fun getName() = "AppiumHarness"

  init {
    reactContext.addLifecycleEventListener(this)
    TransactCommandReceiver.onCommand = { command, extras -> emitCommand(command, extras) }
  }

  /** Extras from the intent that launched (or most recently resumed) the activity. */
  @ReactMethod
  fun getLaunchExtras(promise: Promise) {
    try {
      promise.resolve(currentExtras())
    } catch (error: Exception) {
      promise.reject("launch_extras_failed", error.message, error)
    }
  }

  /** Write to logcat under the tag the conformance suite greps for. */
  @ReactMethod
  fun log(message: String) {
    Log.d(TAG, message)
  }

  // RN requires these for NativeEventEmitter; the events are emitted from native.
  @ReactMethod
  fun addListener(eventName: String) = Unit

  @ReactMethod
  fun removeListeners(count: Int) = Unit

  private fun currentExtras(): WritableMap {
    val map = Arguments.createMap()
    val intent = reactContext.currentActivity?.intent ?: return map
    val extras = intent.extras ?: return map

    for (key in extras.keySet()) {
      if (!key.startsWith("TRANSACT_")) continue
      val value = extras.getString(key)
      if (value != null) {
        map.putString(key, value)
      }
    }

    return map
  }

  private fun emit(event: String, payload: WritableMap) {
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(event, payload)
  }

  private fun emitCommand(command: String, extras: Map<String, String>) {
    val payload = Arguments.createMap()
    payload.putString("command", command)
    val extrasMap = Arguments.createMap()
    for ((key, value) in extras) {
      extrasMap.putString(key, value)
    }
    payload.putMap("extras", extrasMap)
    Log.d(TAG, "Received command $command $extras")
    emit(EVENT_COMMAND, payload)
  }

  /**
   * A `singleTask` relaunch delivers fresh extras through onNewIntent rather than a new activity,
   * so the JS side is told to re-read them. Registered here rather than in MainActivity so the
   * plugin does not have to patch the generated activity.
   */
  override fun onHostResume() {
    val activity = reactContext.currentActivity ?: return
    val launchId = activity.intent?.getStringExtra("TRANSACT_LAUNCH_ID") ?: return
    val payload = Arguments.createMap()
    payload.putString("launchId", launchId)
    payload.putMap("extras", currentExtras())
    emit(EVENT_LAUNCH, payload)
  }

  override fun onHostPause() = Unit

  override fun onHostDestroy() {
    commandReceiver?.let {
      try {
        reactContext.unregisterReceiver(it)
      } catch (error: IllegalArgumentException) {
        Log.w(TAG, "Command receiver already unregistered")
      }
    }
    commandReceiver = null
    TransactCommandReceiver.onCommand = null
  }
}
