import { NativeEventEmitter } from 'react-native';
import * as CONSTANTS from './constants';
import {
  handleNativeEvent,
  removeTransaction,
  type TransactEventName,
} from './transactRegistry';

// Per-task events carry a { instanceId, data } envelope and route through the registry.
const ROUTED_EVENTS: TransactEventName[] = [
  'onInteraction',
  'onDataRequest',
  'onAuthStatusUpdate',
  'onTaskStatusUpdate',
  'onLaunch',
  'onFinish',
  'onClose',
  'onCleanup',
  // iOS-only: the SDK's dedicated in-flow error channel. Android emits no equivalent.
  'onError',
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

  const emitter = new NativeEventEmitter(TransactReactNative);

  // Debug log is process-global (no instanceId) — keep it as a plain passthrough.
  emitter.addListener('onDebugLog', (log: any) => {
    console.debug('[TransactNative]', log?.message);
  });

  const resolveDataRequest = (instanceId: string, response: unknown) => {
    TransactReactNative.resolveDataRequest(instanceId, response);
  };

  ROUTED_EVENTS.forEach((event) => {
    emitter.addListener(event, (payload: any) =>
      handleNativeEvent(event, payload, resolveDataRequest)
    );
  });
}

export const AtomicIOS = {
  transact({
    TransactReactNative,
    instanceId,
    config,
    environment,
    wrapperVersion,
    presentationStyleIOS,
    setDebug,
  }: {
    TransactReactNative: any;
    instanceId: string;
    config: any;
    environment?: CONSTANTS.TransactEnvironment;
    wrapperVersion: string;
    presentationStyleIOS?: CONSTANTS.PresentationStyleIOS;
    setDebug?: boolean;
  }): void {
    installListeners(TransactReactNative);

    TransactReactNative.presentTransact(
      instanceId,
      config,
      environment,
      presentationStyleIOS,
      setDebug,
      wrapperVersion
    )
      .then((event: any) => {
        // onFinish/onClose arrive as enveloped events and are routed by the registry.
        // The completion promise is only a safety net: a terminal error/dismiss may never
        // emit `cleanup-application`, so reclaim the registry entry here to avoid a leak.
        if (event && event.error) {
          removeTransaction(instanceId);
        }
      })
      .catch(() => removeTransaction(instanceId));
  },
  hideTransact(TransactReactNative: any): Promise<void> {
    return TransactReactNative.hideTransact();
  },
};
