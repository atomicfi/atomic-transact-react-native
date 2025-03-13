package com.atomicfi.transactreactnative

import android.content.Context
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import financial.atomic.transact.Config
import financial.atomic.transact.ActionConfig
import financial.atomic.transact.Transact
import financial.atomic.transact.receiver.TransactBroadcastReceiver
import org.json.JSONObject
import java.lang.Exception

class TransactReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private val _reactContext = reactContext

  override fun getName(): String {
    return NAME
  }

  override fun getConstants(): MutableMap<String, Any>? {
    val constants = mutableMapOf<String, Any>()

    constants["VERSION"] = BuildConfig.TRANSACT_VERSION

    return constants
  }

  private fun handleCallbackEvent(
    eventName: String,
    data: JSONObject,
    fieldName: String,
    emitter: DeviceEventManagerModule.RCTDeviceEventEmitter,
    promise: Promise
  ) {
    val value = data.optString(fieldName)
    val result = Arguments.createMap().apply {
      putString(fieldName, value)
    }

    emitter.emit(eventName, data.toString())
    promise.resolve(result)
  }

  @ReactMethod
  fun presentTransact(token: String, environment: String, promise: Promise) {
    val context = currentActivity as Context
    val emitter = _reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
    val config = Config(token = token, environment = "CUSTOM", environmentURL = environment)

    try {
      Transact.present(context, config, object : TransactBroadcastReceiver() {
        override fun onClose(data: JSONObject) {
          handleCallbackEvent("onClose", data, "reason", emitter, promise)
        }

        override fun onFinish(data: JSONObject) {
          handleCallbackEvent("onFinish", data, "taskId", emitter, promise)
        }

        override fun onInteraction(data: JSONObject) {
          emitter.emit("onInteraction", data.toString())
        }

        override fun onDataRequest(data: JSONObject) {
          emitter.emit("onDataRequest", data.toString())
        }

        override fun onAuthStatusUpdate(data: JSONObject) {
          emitter.emit("onAuthStatusUpdate", data.toString())
        }

        override fun onTaskStatusUpdate(data: JSONObject) {
          emitter.emit("onTaskStatusUpdate", data.toString())
        }
      })
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  @ReactMethod
  fun presentAction(id: String, environment: String, promise: Promise) {
    val context = currentActivity as Context
    val emitter = _reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)

    try {
      val config = ActionConfig(
        id = id,
        environment = Config.Environment.CUSTOM,
        environmentURL = environment
      )

      Transact.presentAction(context, config)

      val receiver = object : TransactBroadcastReceiver() {
        override fun onClose(data: JSONObject) {
          handleCallbackEvent("onClose", data, "reason", emitter, promise)
        }

        override fun onFinish(data: JSONObject) {
          handleCallbackEvent("onFinish", data, "taskId", emitter, promise)
        }

        override fun onLaunch() {
          emitter.emit("onLaunch", null)
        }

        override fun onAuthStatusUpdate(data: JSONObject) {
          emitter.emit("onAuthStatusUpdate", data.toString())
        }

        override fun onTaskStatusUpdate(data: JSONObject) {
          emitter.emit("onTaskStatusUpdate", data.toString())
        }
      }

      Transact.registerReceiver(context, receiver)
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  companion object {
    const val NAME = "TransactReactNative"
  }
}
