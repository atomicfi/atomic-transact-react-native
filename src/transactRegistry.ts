// Per-task callback registry for SDK-658 (multi-task / asynchronous callbacks).
//
// Each `Atomic.transact()` call gets a wrapper-generated `instanceId`. The native
// modules echo that id on every event inside an envelope `{ instanceId, data }`, and
// this module routes each event to the handlers registered for that id. That lets
// multiple tasks (especially background `action` flows) run concurrently or
// back-to-back without one launch overriding another's listeners.
//
// Teardown of a task's entry happens ONLY on `onCleanup` (the native
// `cleanup-application` signal). `onFinish`/`onClose` are NOT terminal: for action /
// Uplink flows the SDK keeps a background worker running after the visible UI closes
// and continues emitting `onTaskStatusUpdate`s until cleanup. A terminal error/dismiss
// is handled by the platform layer calling `removeTransaction` directly (safety net).
//
// This module intentionally imports nothing from `react-native` so it can be unit
// tested under the project's bare jest config (mirrors `src/utils.ts`).

export type TransactEventName =
  | 'onInteraction'
  | 'onDataRequest'
  | 'onAuthStatusUpdate'
  | 'onTaskStatusUpdate'
  | 'onLaunch'
  | 'onFinish'
  | 'onClose'
  | 'onCleanup'
  // In-flow SDK error. iOS-only today: the iOS SDK exposes a dedicated `onError`
  // channel (`.transactError`), Android surfaces no equivalent to the host receiver.
  | 'onError';

export interface TransactHandlers {
  onInteraction?: Function;
  onDataRequest?: Function;
  onAuthStatusUpdate?: Function;
  onTaskStatusUpdate?: Function;
  onLaunch?: Function;
  onFinish?: Function;
  onClose?: Function;
  onCleanup?: Function;
  onError?: Function;
}

export interface TransactEnvelope {
  instanceId?: string;
  data?: unknown;
}

// Sends a data-request response back to the originating task on the native side.
export type ResolveDataRequest = (
  instanceId: string,
  response: unknown
) => void;

const transactions = new Map<string, TransactHandlers>();
let counter = 0;

// Monotonic, process-unique id. The counter (not the timestamp) is what guarantees
// uniqueness — multiple ids created within the same millisecond must still differ.
export function createInstanceId(): string {
  counter += 1;
  return `rn-transact-${counter}-${Date.now()}`;
}

export function addTransaction(
  instanceId: string,
  handlers: TransactHandlers
): void {
  transactions.set(instanceId, handlers);
}

export function removeTransaction(instanceId: string): void {
  transactions.delete(instanceId);
}

export function hasTransaction(instanceId: string): boolean {
  return transactions.has(instanceId);
}

// Number of live transactions — used by tests to assert teardown.
export function getActiveCount(): number {
  return transactions.size;
}

// Test-only reset so suites start from a clean registry.
export function _resetForTests(): void {
  transactions.clear();
  counter = 0;
}

// Normalizes a native event payload into `{ instanceId, data }`. Android emits JSON
// strings (DeviceEventEmitter); iOS emits objects (NativeEventEmitter). Tolerates a
// null/empty payload (returns an envelope with no instanceId, which dispatches to a
// no-op).
export function parseEnvelope(raw: unknown): TransactEnvelope {
  const env = typeof raw === 'string' ? JSON.parse(raw) : raw;
  if (env == null || typeof env !== 'object') {
    return {};
  }
  return env as TransactEnvelope;
}

async function dispatchDataRequest(
  instanceId: string,
  data: unknown,
  handler: Function | undefined,
  resolveDataRequest?: ResolveDataRequest
): Promise<void> {
  // A data request is request/response: the handler's result must be sent back to the
  // task that asked. With no handler (or on failure) we still resolve so the native
  // side isn't left waiting (iOS suspends a continuation until this returns).
  if (!handler) {
    resolveDataRequest?.(instanceId, null);
    return;
  }
  try {
    const response = await handler(data);
    resolveDataRequest?.(instanceId, response);
  } catch (error) {
    console.error('## Error in onDataRequest:', error);
    resolveDataRequest?.(instanceId, null);
  }
}

// Routes a single native event to the handlers registered for `instanceId`. Returns a
// promise only for `onDataRequest` (so callers/tests can await the response round-trip);
// all other events are dispatched synchronously and return `undefined`. An unknown
// `instanceId` (e.g. a late event after cleanup) is a safe no-op.
export function dispatchEvent(
  eventName: TransactEventName,
  instanceId: string,
  data: unknown,
  resolveDataRequest?: ResolveDataRequest
): void | Promise<void> {
  const handlers = transactions.get(instanceId);

  switch (eventName) {
    case 'onInteraction':
      handlers?.onInteraction?.(data);
      return;
    case 'onAuthStatusUpdate':
      handlers?.onAuthStatusUpdate?.(data);
      return;
    case 'onTaskStatusUpdate':
      handlers?.onTaskStatusUpdate?.(data);
      return;
    case 'onLaunch':
      handlers?.onLaunch?.();
      return;
    case 'onFinish':
      // Not terminal — keep routing this task's events until `onCleanup`.
      handlers?.onFinish?.(data);
      return;
    case 'onClose':
      // Not terminal — see `onFinish`.
      handlers?.onClose?.(data);
      return;
    case 'onError':
      // In-flow SDK error (iOS-only today). Not terminal on its own — teardown still
      // waits for `onCleanup` (or the platform safety net).
      handlers?.onError?.(data);
      return;
    case 'onCleanup':
      // The session is fully torn down (native `cleanup-application`). This event carries no
      // data, so the consumer callback is invoked with no args (like `onLaunch`). Primary teardown.
      handlers?.onCleanup?.();
      removeTransaction(instanceId);
      return;
    case 'onDataRequest':
      return dispatchDataRequest(
        instanceId,
        data,
        handlers?.onDataRequest,
        resolveDataRequest
      );
    default:
      return;
  }
}

// Convenience for the platform layer: parse the native envelope and dispatch. The
// platform files install ONE persistent listener per event name that calls this.
export function handleNativeEvent(
  eventName: TransactEventName,
  raw: unknown,
  resolveDataRequest?: ResolveDataRequest
): void | Promise<void> {
  const { instanceId, data } = parseEnvelope(raw);
  if (!instanceId) {
    return;
  }
  return dispatchEvent(eventName, instanceId, data, resolveDataRequest);
}
