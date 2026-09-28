package com.atomicfi.appiumtestenvironment

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log

/**
 * Receives the conformance suite's command broadcasts.
 *
 * The suite addresses this class by explicit component
 * (`am broadcast -a <pkg>.COMMAND -n <pkg>/.TransactCommandReceiver --es command PAUSE_TRANSACT`),
 * so it has to exist as a manifest-declared class — a receiver registered at runtime is not
 * addressable that way. Commands are handed to [AppiumHarnessModule] when React Native is up.
 */
class TransactCommandReceiver : BroadcastReceiver() {

  companion object {
    /** Set by [AppiumHarnessModule] while React Native is running. */
    var onCommand: ((String, Map<String, String>) -> Unit)? = null
  }

  override fun onReceive(context: Context, intent: Intent) {
    val command = intent.getStringExtra("command")
    if (command == null) {
      Log.w(AppiumHarnessModule.TAG, "Broadcast without a command extra")
      return
    }

    val extras = mutableMapOf<String, String>()
    intent.extras?.let { bundle ->
      for (key in bundle.keySet()) {
        if (key == "command") continue
        bundle.getString(key)?.let { extras[key] = it }
      }
    }

    val handler = onCommand
    if (handler == null) {
      Log.w(AppiumHarnessModule.TAG, "Dropping command $command — React Native not running yet")
      return
    }

    handler(command, extras)
  }
}
