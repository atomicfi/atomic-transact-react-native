import { NativeModules, NativeEventEmitter, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-transact-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const TransactSdk = NativeModules.TransactSdk
  ? NativeModules.TransactSdk
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

const TransactSdkEvents = new NativeEventEmitter(TransactSdk)

export enum TransactURL {
  Production = "https://transact.atomicfi.com",
  Sandbox = "https://transact-sandbox.atomicfi.com"
}

export const Atomic = {
  transact({ transactConfig, transactURL, onInteraction, onFinish, onClose } : { transactConfig: Object, transactURL?: TransactURL, onInteraction?: Function, onFinish?: Function, onClose?: Function }) : void {
    transactURL = transactURL || TransactURL.Production
    TransactSdkEvents.addListener('onInteraction', onInteraction)

    TransactSdk.presentTransact(transactConfig, transactURL).then(event => {
      if (event.finished && onFinish) {
        onFinish(event.finished)
      } else if (event.closed && onClose) {
        onClose(event.closed)
      }
    });
  }
}
