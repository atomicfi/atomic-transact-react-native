const mockIOSTransact = jest.fn();
const mockAndroidTransact = jest.fn();

jest.mock('react-native', () => ({
  Platform: { OS: 'ios', select: (obj: any) => obj.ios ?? obj.default },
  NativeModules: { TransactReactNative: {} },
  Appearance: { getColorScheme: () => 'light' },
  NativeEventEmitter: jest.fn(),
  DeviceEventEmitter: { addListener: jest.fn() },
}));

jest.mock('../ios', () => ({
  AtomicIOS: { transact: (...args: any[]) => mockIOSTransact(...args) },
}));
jest.mock('../android', () => ({
  AtomicAndroid: { transact: (...args: any[]) => mockAndroidTransact(...args) },
}));

import { Atomic, Step } from '../index';

beforeEach(() => {
  mockIOSTransact.mockClear();
  mockAndroidTransact.mockClear();
});

describe('account deeplink config', () => {
  it('exposes account as a valid deeplink step', () => {
    expect(Step.ACCOUNT).toBe('account');
  });

  it('forwards the account step and accountId through config-to-JSON conversion', () => {
    Atomic.transact({
      config: {
        publicToken: 'pt-abc-123',
        scope: 'user-link',
        deeplink: { step: Step.ACCOUNT, accountId: 'abc123' },
        tasks: [{ operation: 'auth' }],
      },
    });

    expect(mockIOSTransact).toHaveBeenCalledTimes(1);

    // The RN bridge serializes the config to JSON before it reaches native.
    // Round-trip it here to assert the account deeplink survives that conversion.
    const { config } = mockIOSTransact.mock.calls[0][0];
    const serialized = JSON.parse(JSON.stringify(config));

    expect(serialized.deeplink).toEqual({
      step: 'account',
      accountId: 'abc123',
    });
  });

  it('leaves other deeplink steps and payload fields unchanged', () => {
    Atomic.transact({
      config: {
        publicToken: 'pt-abc-123',
        scope: 'user-link',
        deeplink: { step: Step.SEARCH_COMPANY, companyId: 'co-1' },
        tasks: [{ operation: 'auth' }],
      },
    });

    const { config } = mockIOSTransact.mock.calls[0][0];
    const serialized = JSON.parse(JSON.stringify(config));

    expect(serialized.deeplink).toEqual({
      step: 'search-company',
      companyId: 'co-1',
    });
    expect(serialized.deeplink.accountId).toBeUndefined();
  });
});
