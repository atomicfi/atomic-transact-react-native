import { DeviceEventEmitter } from 'react-native';
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
    wrapperVersion,
    onInteraction,
    onLaunch,
    onTaskStatusUpdate,
    onAuthStatusUpdate,
    onFinish,
    onDataRequest,
    onClose,
    setDebug,
  }: {
    TransactReactNative: any;
    config: any;
    environment?: CONSTANTS.TransactEnvironment;
    wrapperVersion: string;
    onInteraction?: Function;
    onLaunch?: Function;
    onTaskStatusUpdate?: Function;
    onAuthStatusUpdate?: Function;
    onDataRequest?: Function;
    onFinish?: Function;
    onClose?: Function;
    setDebug?: boolean;
  }): void {
    _addEventListener('onDebugLog', (log: any) => {
      console.debug('[TransactNative]', log.message);
    });
    _addEventListener('onClose', onClose);
    _addEventListener('onFinish', onFinish);
    _addEventListener('onLaunch', onLaunch);
    _addEventListener('onInteraction', onInteraction);
    _addEventListener('onDataRequest', onDataRequest);
    _addEventListener('onTaskStatusUpdate', onTaskStatusUpdate);
    _addEventListener('onAuthStatusUpdate', onAuthStatusUpdate);

    TransactReactNative.presentTransact(
      config,
      environment,
      wrapperVersion,
      setDebug ?? false
    );
  },
};
