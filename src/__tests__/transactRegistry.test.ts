import {
  _resetForTests,
  addTransaction,
  createInstanceId,
  dispatchEvent,
  getActiveCount,
  handleNativeEvent,
  hasTransaction,
  parseEnvelope,
  removeTransaction,
} from '../transactRegistry';

beforeEach(() => {
  _resetForTests();
});

describe('createInstanceId', () => {
  it('returns distinct ids in a tight loop (counter is load-bearing)', () => {
    const ids = new Set<string>();
    for (let i = 0; i < 1000; i++) {
      ids.add(createInstanceId());
    }
    expect(ids.size).toBe(1000);
  });
});

describe('dispatchEvent routing isolation', () => {
  it('routes events only to the matching task (core SDK-658 regression)', () => {
    const a = jest.fn();
    const b = jest.fn();
    addTransaction('A', { onTaskStatusUpdate: a });
    addTransaction('B', { onTaskStatusUpdate: b });

    dispatchEvent('onTaskStatusUpdate', 'A', { taskId: 'a1' });
    dispatchEvent('onTaskStatusUpdate', 'B', { taskId: 'b1' });
    dispatchEvent('onTaskStatusUpdate', 'A', { taskId: 'a2' });

    expect(a).toHaveBeenCalledTimes(2);
    expect(a).toHaveBeenNthCalledWith(1, { taskId: 'a1' });
    expect(a).toHaveBeenNthCalledWith(2, { taskId: 'a2' });
    expect(b).toHaveBeenCalledTimes(1);
    expect(b).toHaveBeenCalledWith({ taskId: 'b1' });
  });

  it('forwards interaction and auth payloads to the right handler', () => {
    const onInteraction = jest.fn();
    const onAuthStatusUpdate = jest.fn();
    addTransaction('A', { onInteraction, onAuthStatusUpdate });

    dispatchEvent('onInteraction', 'A', { name: 'x' });
    dispatchEvent('onAuthStatusUpdate', 'A', { status: 'pending' });

    expect(onInteraction).toHaveBeenCalledWith({ name: 'x' });
    expect(onAuthStatusUpdate).toHaveBeenCalledWith({ status: 'pending' });
  });

  it('routes onError (iOS-only in-flow error) to the owning task and is not terminal', () => {
    const onError = jest.fn();
    addTransaction('A', { onError });

    dispatchEvent('onError', 'A', { code: 'sdk-error' });

    expect(onError).toHaveBeenCalledWith({ code: 'sdk-error' });
    // onError alone does not evict — teardown still waits for onCleanup.
    expect(hasTransaction('A')).toBe(true);
  });

  it('calls onLaunch with no args', () => {
    const onLaunch = jest.fn();
    addTransaction('A', { onLaunch });
    dispatchEvent('onLaunch', 'A', null);
    expect(onLaunch).toHaveBeenCalledTimes(1);
    expect(onLaunch).toHaveBeenCalledWith();
  });

  it('is a safe no-op for an unknown instanceId', () => {
    expect(() =>
      dispatchEvent('onTaskStatusUpdate', 'missing', { taskId: 'x' })
    ).not.toThrow();
  });
});

describe('teardown semantics (onCleanup only)', () => {
  it('keeps the entry alive through onClose/onFinish and only evicts on onCleanup', () => {
    const onClose = jest.fn();
    const onFinish = jest.fn();
    const onTaskStatusUpdate = jest.fn();
    const onCleanup = jest.fn();
    addTransaction('A', { onClose, onFinish, onTaskStatusUpdate, onCleanup });

    dispatchEvent('onClose', 'A', { reason: 'done' });
    dispatchEvent('onFinish', 'A', { taskId: 'a1' });

    // Still registered — background work may keep streaming events after close/finish.
    expect(hasTransaction('A')).toBe(true);
    dispatchEvent('onTaskStatusUpdate', 'A', {
      taskId: 'a1',
      status: 'processing',
    });
    expect(onTaskStatusUpdate).toHaveBeenCalledTimes(1);

    // cleanup-application is the terminal signal. It carries no data — onCleanup takes no args.
    dispatchEvent('onCleanup', 'A', null);
    expect(onCleanup).toHaveBeenCalledTimes(1);
    expect(onCleanup).toHaveBeenCalledWith();
    expect(hasTransaction('A')).toBe(false);

    // Late events after cleanup are dropped.
    dispatchEvent('onTaskStatusUpdate', 'A', {
      taskId: 'a1',
      status: 'completed',
    });
    expect(onTaskStatusUpdate).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it('removeTransaction (safety net for terminal error/dismiss) evicts the entry', () => {
    addTransaction('A', { onFinish: jest.fn() });
    expect(getActiveCount()).toBe(1);
    removeTransaction('A');
    expect(getActiveCount()).toBe(0);
  });
});

describe('onDataRequest round-trip', () => {
  it('resolves with the handler result for the originating task', async () => {
    const resolve = jest.fn();
    addTransaction('A', {
      onDataRequest: async (req: any) => ({ echoed: req.id }),
    });

    await dispatchEvent('onDataRequest', 'A', { id: 'req-a' }, resolve);

    expect(resolve).toHaveBeenCalledTimes(1);
    expect(resolve).toHaveBeenCalledWith('A', { echoed: 'req-a' });
  });

  it('routes concurrent data requests to their own resolvers', async () => {
    const resolve = jest.fn();
    addTransaction('A', { onDataRequest: async () => 'respA' });
    addTransaction('B', { onDataRequest: async () => 'respB' });

    await Promise.all([
      dispatchEvent('onDataRequest', 'A', {}, resolve),
      dispatchEvent('onDataRequest', 'B', {}, resolve),
    ]);

    expect(resolve).toHaveBeenCalledWith('A', 'respA');
    expect(resolve).toHaveBeenCalledWith('B', 'respB');
  });

  it('resolves null when there is no handler', async () => {
    const resolve = jest.fn();
    addTransaction('A', {});
    await dispatchEvent('onDataRequest', 'A', {}, resolve);
    expect(resolve).toHaveBeenCalledWith('A', null);
  });

  it('resolves null when the handler throws', async () => {
    const resolve = jest.fn();
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    addTransaction('A', {
      onDataRequest: async () => {
        throw new Error('boom');
      },
    });

    await dispatchEvent('onDataRequest', 'A', {}, resolve);

    expect(resolve).toHaveBeenCalledWith('A', null);
    spy.mockRestore();
  });
});

describe('parseEnvelope', () => {
  it('parses a stringified (Android) envelope', () => {
    const raw = JSON.stringify({ instanceId: 'A', data: { taskId: 'a1' } });
    expect(parseEnvelope(raw)).toEqual({
      instanceId: 'A',
      data: { taskId: 'a1' },
    });
  });

  it('passes through an object (iOS) envelope', () => {
    const raw = { instanceId: 'A', data: { name: 'x' } };
    expect(parseEnvelope(raw)).toEqual({
      instanceId: 'A',
      data: { name: 'x' },
    });
  });

  it('tolerates a null payload', () => {
    expect(parseEnvelope(null)).toEqual({});
  });
});

describe('handleNativeEvent', () => {
  it('parses + dispatches a stringified envelope to the right task', () => {
    const onTaskStatusUpdate = jest.fn();
    addTransaction('A', { onTaskStatusUpdate });

    handleNativeEvent(
      'onTaskStatusUpdate',
      JSON.stringify({ instanceId: 'A', data: { taskId: 'a1' } })
    );

    expect(onTaskStatusUpdate).toHaveBeenCalledWith({ taskId: 'a1' });
  });

  it('dispatches onLaunch from an envelope with a null data field', () => {
    const onLaunch = jest.fn();
    addTransaction('A', { onLaunch });
    handleNativeEvent('onLaunch', { instanceId: 'A', data: null });
    expect(onLaunch).toHaveBeenCalledTimes(1);
  });

  it('is a no-op when the envelope has no instanceId', () => {
    expect(() => handleNativeEvent('onLaunch', {})).not.toThrow();
  });
});
