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
