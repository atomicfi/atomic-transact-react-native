import { Appearance, NativeModules, Platform } from 'react-native';
import { AtomicIOS } from './ios';
import { AtomicAndroid } from './android';

const LINKING_ERROR =
  `The package 'transact-react-native' doesn't seem to be linked. Make sure: \n\n` +
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

export enum Product {
  DEPOSIT = 'deposit',
  VERIFY = 'verify',
  IDENTIFY = 'identify',
  WITHHOLD = 'withhold',
}

export enum Environment {
  Production = 'https://transact.atomicfi.com',
  Sandbox = 'https://transact-sandbox.atomicfi.com',
}

export const Atomic = {
  transact({
    config,
    environment,
    onInteraction,
    onFinish,
    onDataRequest,
    onClose,
  }: {
    config: Object;
    environment?: Environment;
    onInteraction?: Function;
    onDataRequest?: Function;
    onFinish?: Function;
    onClose?: Function;
  }): void {
    environment = environment || Environment.Production;

    config.language = config.language || 'en'
    config.theme = config.theme || {}
    config.theme.dark = config.theme.dark !== undefined
      ? config.theme.dark
      : Appearance.getColorScheme() === 'dark'

    const args = {
      TransactSdk,
      config,
      environment,
      onInteraction,
      onFinish,
      onDataRequest,
      onClose,
    };

    switch (Platform.OS) {
      case 'ios':
        AtomicIOS.transact(args);
        break;
      case 'android':
        AtomicAndroid.transact(args);
        break;
      default:
        throw new Error(`Unsupported OS: ${Platform.OS}`);
    }
  },
};
