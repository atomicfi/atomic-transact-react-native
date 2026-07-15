import { DeviceEventEmitter } from 'react-native';
import * as CONSTANTS from './constants';
import {
  handleNativeEvent,
  removeTransaction,
  type TransactEventName,
} from './transactRegistry';

// Per-task events carry a { instanceId, data } envelope and route through the registry.
// Android delivers each event as a JSON-string envelope.
const ROUTED_EVENTS: TransactEventName[] = [
  'onInteraction',
  'onDataRequest',
  'onAuthStatusUpdate',
  'onTaskStatusUpdate',
  'onLaunch',
  'onFinish',
  'onClose',
  'onCleanup',
];

let listenersInstalled = false;

// Install one persistent listener per event exactly once. We never call
// removeAllListeners — the previous per-call teardown is what overrode earlier tasks'
// callbacks (SDK-658). Routing by instanceId keeps each task's callbacks isolated.
function installListeners(TransactReactNative: any) {
  if (listenersInstalled) {
    return;
  }
  listenersInstalled = true;

  // Debug log is process-global (no per-task instanceId) — a plain passthrough.
  DeviceEventEmitter.addListener('onDebugLog', (raw) => {
    try {
      const log = typeof raw === 'string' ? JSON.parse(raw) : raw;
      console.debug('[TransactNative]', log?.message);
    } catch {
      console.debug('[TransactNative]', raw);
    }
  });

  const resolveDataRequest = (instanceId: string, response: unknown) => {
    TransactReactNative.resolveDataRequest(instanceId, response);
  };

  ROUTED_EVENTS.forEach((event) => {
    DeviceEventEmitter.addListener(event, (raw) =>
      handleNativeEvent(event, raw, resolveDataRequest)
    );
  });
}

export const AtomicAndroid = {
  transact({
    TransactReactNative,
    instanceId,
    config,
    environment,
    wrapperVersion,
    setDebug,
  }: {
    TransactReactNative: any;
    instanceId: string;
    config: any;
    environment?: CONSTANTS.TransactEnvironment;
    wrapperVersion: string;
    setDebug?: boolean;
  }): void {
    installListeners(TransactReactNative);
    TransactReactNative.presentTransact(
      instanceId,
      config,
      environment,
      wrapperVersion,
      setDebug ?? false
    ).catch(() => {
      // Launch failed (no foreground Activity, or a native setup throw): the native module
      // already drops its receivers-map entry on these paths, so reclaim the JS registry entry
      // too — no onFinish/onClose/onCleanup will ever fire for a launch that never started.
      // Mirrors the iOS safety net (ios.tsx). Without this the handlers leak for the process
      // lifetime and the rejection goes unhandled.
      removeTransaction(instanceId);
    });
  },
};
