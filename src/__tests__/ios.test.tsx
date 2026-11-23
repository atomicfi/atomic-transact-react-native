jest.mock('react-native', () => ({
  NativeEventEmitter: jest.fn().mockImplementation(() => ({
    addListener: jest.fn(),
  })),
}));

import { AtomicIOS } from '../ios';
import {
  _resetForTests,
  addTransaction,
  hasTransaction,
} from '../transactRegistry';

beforeEach(() => {
  _resetForTests();
});

// Lets the promise chain in AtomicIOS.transact settle.
const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

const launch = (presentTransact: jest.Mock) =>
  AtomicIOS.transact({
    TransactReactNative: { presentTransact },
    instanceId: 'A',
    config: {},
    wrapperVersion: '0.0.0',
  });

describe('AtomicIOS.transact launch failures', () => {
  it('delivers a native rejection to onError and removes the task', async () => {
    const onError = jest.fn();
    addTransaction('A', { onError });

    // What React Native hands JS for reject("no_presenting_view_controller", ...).
    const rejection = Object.assign(
      new Error('No view controller to present Transact from'),
      { code: 'no_presenting_view_controller' }
    );
    launch(jest.fn().mockRejectedValue(rejection));
    await flushPromises();

    expect(onError).toHaveBeenCalledWith({
      code: 'no_presenting_view_controller',
      message: 'No view controller to present Transact from',
    });
    expect(hasTransaction('A')).toBe(false);
  });

  it('keeps the task registered while the launch is still in flight', async () => {
    addTransaction('A', { onError: jest.fn() });

    launch(jest.fn().mockReturnValue(new Promise(() => {})));
    await flushPromises();

    expect(hasTransaction('A')).toBe(true);
  });
});

describe('AtomicIOS.transact React Native version', () => {
  const launchWithVersion = (reactNativeVersion?: string | null) => {
    const presentTransact = jest.fn().mockReturnValue(new Promise(() => {}));
    AtomicIOS.transact({
      TransactReactNative: { presentTransact },
      instanceId: 'A',
      config: {},
      wrapperVersion: '0.0.0',
      reactNativeVersion,
    });
    return presentTransact;
  };

  it('passes the React Native version after the wrapper version', () => {
    const presentTransact = launchWithVersion('0.87.0-rc.1');

    expect(presentTransact.mock.calls[0][5]).toBe('0.0.0');
    expect(presentTransact.mock.calls[0][6]).toBe('0.87.0-rc.1');
  });

  it('passes null when the React Native version is unavailable', () => {
    const presentTransact = launchWithVersion();

    expect(presentTransact.mock.calls[0][6]).toBeNull();
  });
});
