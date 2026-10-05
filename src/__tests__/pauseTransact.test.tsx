const mockPauseTransact = jest.fn();
const mockResumeTransact = jest.fn();

// Runs the real platform layers down to the native module, which index.tsx captures at load time.
jest.mock('react-native', () => ({
  Platform: { OS: 'ios', select: (obj: any) => obj.ios ?? obj.default },
  NativeModules: {
    TransactReactNative: {
      pauseTransact: (...args: any[]) => mockPauseTransact(...args),
      resumeTransact: (...args: any[]) => mockResumeTransact(...args),
    },
  },
  Appearance: { getColorScheme: () => 'light' },
  NativeEventEmitter: jest.fn(),
  DeviceEventEmitter: { addListener: jest.fn() },
}));

import { Platform } from 'react-native';
import { Atomic } from '../index';

const setOS = (os: string) => {
  (Platform as any).OS = os;
};

// What React Native hands JS for a native reject(code, message).
const nativeError = (code: string, message: string) =>
  Object.assign(new Error(message), { code });

beforeEach(() => {
  mockPauseTransact.mockReset().mockResolvedValue(undefined);
  mockResumeTransact.mockReset().mockResolvedValue(undefined);
});

afterEach(() => setOS('ios'));

describe.each(['ios', 'android'])('pauseTransact on %s', (os) => {
  beforeEach(() => setOS(os));

  it('pauses, then resumes the same session', async () => {
    const paused = await Atomic.pauseTransact();

    expect(mockPauseTransact).toHaveBeenCalledWith(expect.any(String), true);
    expect(mockResumeTransact).not.toHaveBeenCalled();

    await paused.resume();

    const [pauseId] = mockPauseTransact.mock.calls[0];
    expect(mockResumeTransact).toHaveBeenCalledWith(pauseId, true);
  });

  it('takes animated separately for the pause and the resume', async () => {
    const first = await Atomic.pauseTransact({ animated: false });
    await first.resume();
    const second = await Atomic.pauseTransact();
    await second.resume({ animated: false });

    expect(
      mockPauseTransact.mock.calls.map(([, animated]) => animated)
    ).toEqual([false, true]);
    expect(
      mockResumeTransact.mock.calls.map(([, animated]) => animated)
    ).toEqual([true, false]);
  });

  it('names each pause, so a ref resumes only its own session', async () => {
    const first = await Atomic.pauseTransact();
    const second = await Atomic.pauseTransact();

    const [firstId] = mockPauseTransact.mock.calls[0];
    const [secondId] = mockPauseTransact.mock.calls[1];
    expect(firstId).not.toBe(secondId);

    await second.resume();
    await first.resume();

    expect(mockResumeTransact.mock.calls.map(([id]) => id)).toEqual([
      secondId,
      firstId,
    ]);
  });

  it('rejects with the native code when nothing can be paused', async () => {
    mockPauseTransact.mockRejectedValue(
      nativeError(
        'transact_not_presented',
        'No Transact is currently presented'
      )
    );

    await expect(Atomic.pauseTransact()).rejects.toMatchObject({
      code: 'transact_not_presented',
    });
  });

  it('rejects a resume the native side refuses', async () => {
    mockResumeTransact.mockRejectedValue(
      nativeError('no_paused_transact', 'No paused Transact to resume')
    );

    const paused = await Atomic.pauseTransact();

    await expect(paused.resume()).rejects.toMatchObject({
      code: 'no_paused_transact',
    });
  });
});

describe('pauseTransact on other platforms', () => {
  it('rejects without calling native', async () => {
    setOS('web');

    await expect(Atomic.pauseTransact()).rejects.toThrow('Unsupported OS: web');
    expect(mockPauseTransact).not.toHaveBeenCalled();
  });
});
