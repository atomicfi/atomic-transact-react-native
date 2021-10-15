import { NativeModules, Platform } from 'react-native';

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

export enum TransactURL {
  Production = "https://transact.atomicfi.com",
  Sandbox = "https://transact-sandbox.atomicfi.com"
}

export function presentTransact({ atomicConfig, transactURL }: { atomicConfig: Object, transactURL?: TransactURL }): Promise<Object> {
  transactURL = transactURL || TransactURL.Production
  return TransactSdk.presentTransact(atomicConfig, transactURL);
}
