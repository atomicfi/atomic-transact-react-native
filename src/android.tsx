import { Buffer } from 'buffer';
import { DeviceEventEmitter, Platform } from 'react-native';
import * as CONSTANTS from './constants';

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
    onTaskStatusUpdate,
    onAuthStatusUpdate,
    onFinish,
    onDataRequest,
    onClose,
  }: {
    TransactReactNative: any;
    config: any;
    environment?: CONSTANTS.TransactEnvironment;
    onInteraction?: Function;
    onTaskStatusUpdate?: Function;
    onAuthStatusUpdate?: Function;
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
    _addEventListener('onTaskStatusUpdate', onTaskStatusUpdate);
    _addEventListener('onAuthStatusUpdate', onAuthStatusUpdate);

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
    onTaskStatusUpdate,
    onAuthStatusUpdate,
  }: {
    TransactReactNative: any;
    id: String;
    environment?: CONSTANTS.TransactEnvironment;
    onLaunch?: Function;
    onFinish?: Function;
    onClose?: Function;
    onTaskStatusUpdate?: Function;
    onAuthStatusUpdate?: Function;
  }): void {
    _addEventListener('onLaunch', onLaunch);
    _addEventListener('onClose', onClose);
    _addEventListener('onFinish', onFinish);
    _addEventListener('onTaskStatusUpdate', onTaskStatusUpdate);
    _addEventListener('onAuthStatusUpdate', onAuthStatusUpdate);

    TransactReactNative.presentAction(id, environment);
  },
};
