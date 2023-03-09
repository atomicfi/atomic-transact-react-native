import { Buffer } from 'buffer';
import { DeviceEventEmitter, Platform } from 'react-native';
import { Environment } from './constants';

const ENVIRONMENT = {
  [Environment.Production]: 'PRODUCTION',
};

function _eventHandler(request: string, func: Function) {
  return func(JSON.parse(request));
}

function _addEventListener(event: string, func: Function | undefined) {
  DeviceEventEmitter.removeAllListeners(event);
  if (func) {
    DeviceEventEmitter.addListener(event, (request) =>
      _eventHandler(request, func)
    );
  }
}

export const AtomicAndroid = {
  transact({
    TransactSdk,
    config,
    environment,
    onInteraction,
    onFinish,
    onDataRequest,
    onClose,
  }: {
    TransactSdk: any;
    config: any;
    environment?: String;
    onInteraction?: Function;
    onDataRequest?: Function;
    onFinish?: Function;
    onClose?: Function;
  }): void {
    config.platform = {
      name: 'android',
      systemVersion: Platform.Version.toString(),
      sdkVersion: TransactSdk.getConstants().VERSION + '-react',
    };

    _addEventListener('onClose', onClose);
    _addEventListener('onFinish', onFinish);
    _addEventListener('onInteraction', onInteraction);
    _addEventListener('onDataRequest', onDataRequest);

    const token = Buffer.from(JSON.stringify(config)).toString('base64');

    TransactSdk.presentTransact(
      token,
      ENVIRONMENT[(environment || Environment.Production).toString()]
    );
  },
};
