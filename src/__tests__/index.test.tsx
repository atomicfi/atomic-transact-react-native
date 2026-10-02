const mockIOSTransact = jest.fn();
const mockAndroidTransact = jest.fn();
const mockIOSHideTransact = jest.fn();
const mockAndroidHideTransact = jest.fn();

jest.mock('react-native', () => ({
  Platform: { OS: 'ios', select: (obj: any) => obj.ios ?? obj.default },
  NativeModules: { TransactReactNative: {} },
  Appearance: { getColorScheme: () => 'light' },
  NativeEventEmitter: jest.fn(),
  DeviceEventEmitter: { addListener: jest.fn() },
}));

jest.mock('../ios', () => ({
  AtomicIOS: {
    transact: (...args: any[]) => mockIOSTransact(...args),
    hideTransact: (...args: any[]) => mockIOSHideTransact(...args),
  },
}));
jest.mock('../android', () => ({
  AtomicAndroid: {
    transact: (...args: any[]) => mockAndroidTransact(...args),
    hideTransact: (...args: any[]) => mockAndroidHideTransact(...args),
  },
}));

import { Platform } from 'react-native';
import { Atomic, Handoff, Step } from '../index';

beforeEach(() => {
  mockIOSTransact.mockClear();
  mockAndroidTransact.mockClear();
  mockIOSHideTransact.mockClear();
  mockAndroidHideTransact.mockClear();
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

describe('handoff config', () => {
  const baseConfig = {
    publicToken: 'pt-abc-123',
    scope: 'user-link',
    tasks: [{ operation: 'deposit' }],
  };

  it('exposes the handoff views Transact accepts', () => {
    expect(Handoff).toEqual({
      EXIT_PROMPT: 'exit-prompt',
      AUTHENTICATION_SUCCESS: 'authentication-success',
      HIGH_LATENCY: 'high-latency',
      SELECTED_COMPANY: 'selected-company',
    });
  });

  it('forwards a handoff array unchanged', () => {
    Atomic.transact({
      config: {
        ...baseConfig,
        handoff: [Handoff.AUTHENTICATION_SUCCESS, Handoff.EXIT_PROMPT],
      },
    });

    const { config } = mockIOSTransact.mock.calls[0][0];
    expect(JSON.parse(JSON.stringify(config)).handoff).toEqual([
      'authentication-success',
      'exit-prompt',
    ]);
  });

  it('wraps a single string in an array, which is the only shape Transact accepts', () => {
    Atomic.transact({
      config: {
        ...baseConfig,
        // The Config type used to declare a string, so existing callers may still pass one.
        handoff: 'authentication-success' as any,
      },
    });

    const { config } = mockIOSTransact.mock.calls[0][0];
    expect(config.handoff).toEqual(['authentication-success']);
  });

  it('leaves handoff unset when none is given', () => {
    Atomic.transact({ config: { ...baseConfig } });

    const { config } = mockIOSTransact.mock.calls[0][0];
    expect(config).not.toHaveProperty('handoff');
  });
});

describe('hideTransact', () => {
  const setOS = (os: string) => {
    (Platform as any).OS = os;
  };

  afterEach(() => setOS('ios'));

  it('hides Transact on iOS', () => {
    Atomic.hideTransact();

    expect(mockIOSHideTransact).toHaveBeenCalledTimes(1);
    expect(mockAndroidHideTransact).not.toHaveBeenCalled();
  });

  it('hides Transact on Android', () => {
    setOS('android');

    expect(() => Atomic.hideTransact()).not.toThrow();
    expect(mockAndroidHideTransact).toHaveBeenCalledTimes(1);
    expect(mockIOSHideTransact).not.toHaveBeenCalled();
  });

  it('throws on other platforms', () => {
    setOS('web');

    expect(() => Atomic.hideTransact()).toThrow('Unsupported OS: web');
  });
});
