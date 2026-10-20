jest.mock('react-native', () => ({
  DeviceEventEmitter: { addListener: jest.fn() },
}));

import { AtomicAndroid } from '../android';
import { PresentationStyles } from '../constants';
import type { PresentationStyleAndroid } from '../constants';

const launch = (presentationStyleAndroid?: PresentationStyleAndroid) => {
  const presentTransact = jest.fn().mockResolvedValue(null);
  AtomicAndroid.transact({
    TransactReactNative: { presentTransact },
    instanceId: 'A',
    config: { publicToken: 'pt-abc-123' },
    environment: { environment: 'sandbox' },
    wrapperVersion: '0.0.0',
    presentationStyleAndroid,
    setDebug: true,
  });
  return presentTransact;
};

describe('AtomicAndroid.transact presentation style', () => {
  it('passes form sheet to the native module', () => {
    const presentTransact = launch(PresentationStyles.formSheet);

    expect(presentTransact).toHaveBeenCalledWith(
      'A',
      { publicToken: 'pt-abc-123' },
      { environment: 'sandbox' },
      'formSheet',
      '0.0.0',
      true
    );
  });

  it('passes full screen to the native module', () => {
    const presentTransact = launch(PresentationStyles.fullScreen);

    expect(presentTransact.mock.calls[0][3]).toBe('fullScreen');
  });

  it('passes null when unset, which the native module reads as full screen', () => {
    const presentTransact = launch();

    expect(presentTransact.mock.calls[0][3]).toBeNull();
  });
});
