import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

export interface HarnessNativeModule {
  getLaunchExtras(): Promise<Record<string, string>>;
  log(message: string): void;
}

const native = NativeModules.AppiumHarness as HarnessNativeModule | undefined;

/**
 * Log under the `AppiumTestEnvironment` tag.
 *
 * Routed through the native module rather than console.log because the Android specs grep logcat:
 * React Native's own console bridge logs everything under `ReactNativeJS`, which never matches.
 */
export const log = (message: string) => {
  if (native) {
    native.log(message);
  } else {
    console.log(`AppiumTestEnvironment: ${message}`);
  }
};

/**
 * Launch parameters the suite supplied — intent extras on Android, process environment variables
 * on iOS. The native module normalizes both to the same TRANSACT_* map.
 */
export const getLaunchExtras = async (): Promise<Record<string, string>> => {
  if (!native) return {};
  try {
    return await native.getLaunchExtras();
  } catch (error) {
    log(`Failed to read launch extras: ${String(error)}`);
    return {};
  }
};

/**
 * Android-only. The Android module emits relaunch and broadcast-command events; on iOS the suite
 * sends commands as `atomictest://` deep links instead (see App.tsx), and the iOS module exposes
 * no events — constructing an emitter for it would warn about the missing
 * addListener/removeListeners.
 */
export const harnessEvents =
  native && Platform.OS === 'android'
    ? new NativeEventEmitter(NativeModules.AppiumHarness)
    : null;

export const isHarnessAvailable = Boolean(native);
