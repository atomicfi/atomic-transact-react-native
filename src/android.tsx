import { Buffer } from 'buffer';
import { DeviceEventEmitter, Platform } from 'react-native';

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
    TransactReactNative,
    config,
    environment,
    onInteraction,
    onFinish,
    onDataRequest,
    onClose,
  }: {
    TransactReactNative: any;
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
      sdkVersion: TransactReactNative.getConstants().VERSION + '-react',
    };

    _addEventListener('onClose', onClose);
    _addEventListener('onFinish', onFinish);
    _addEventListener('onInteraction', onInteraction);
    _addEventListener('onDataRequest', onDataRequest);

    const token = Buffer.from(JSON.stringify(config)).toString('base64');

    TransactReactNative.presentTransact(token, environment);
  },
  presentAction({
    TransactReactNative,
    id,
    environment,
    onLaunch,
    onFinish,
    onClose,
  }: {
    TransactReactNative: any;
    id: String;
    environment?: String;
    onLaunch?: Function;
    onFinish?: Function;
    onClose?: Function;
  }): void {
    _addEventListener('onLaunch', onLaunch);
    _addEventListener('onClose', onClose);
    _addEventListener('onFinish', onFinish);

    TransactReactNative.presentAction(id, environment);
  },
};
