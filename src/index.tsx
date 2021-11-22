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

export enum Product {
  DEPOSIT = 'deposit',
  VERIFY = 'verify',
  IDENTIFY = 'identify',
  WITHHOLD = 'withhold'
}

export enum Environment {
  PRODUCTION = "https://transact.atomicfi.com",
  SANDBOX = "https://transact-sandbox.atomicfi.com"
}

export const Atomic = {
  transact({ config, environment, onInteraction, onFinish, onDataRequest, onClose } : { config: Object, environment?: Environment, onInteraction?: Function, onDataRequest?: Function, onFinish?: Function, onClose?: Function }) : void {
    environment = environment || Environment.PRODUCTION

    if (onInteraction) {
      TransactSdkEvents.addListener('onInteraction', interaction => onInteraction(interaction))
    }

    if (onDataRequest) {
      TransactSdkEvents.addListener('onDataRequest', request => onDataRequest(request))
    }

    TransactSdk.presentTransact(config, environment).then((event: any) => {
      if (event.finished && onFinish) {
        onFinish(event.finished)
      } else if (event.closed && onClose) {
        onClose(event.closed)
      }
    });
  }
}
