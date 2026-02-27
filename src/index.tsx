import { Appearance, NativeModules, Platform } from 'react-native';
import { AtomicIOS } from './ios';
import { AtomicAndroid } from './android';
import * as CONSTANTS from './constants';
import type { PresentationStyleIOS, AppType, StepType } from './constants';

const LINKING_ERROR =
  `The package '@atomicfi/transact-react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const TransactReactNative = NativeModules.TransactReactNative
  ? NativeModules.TransactReactNative
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

interface Theme {
  brandColor?: String;
  overlayColor?: String;
  dark?: Boolean;
  navigationOptions?: {
    showBackButton?: Boolean;
    showBackButtonText?: Boolean;
    showCloseButton?: Boolean;
  };
}

interface Task {
  product?: String; // Deprecated
  operation: String;
  distribution?: Object;
  navigationOptions?: Object;
  apps?: AppType[];
}

interface Customer {
  name: String;
}

interface DeeplinkOptions {
  step?: StepType;
  app?: AppType;
  companyId?: string;
  connectorId?: string;
  companyName?: string;
  singleSwitch?: boolean;
  payments?: string[];
  accountId?: string;
}

interface Config {
  publicToken: String;
  scope: String;
  product?: String;
  additionalProduct?: String;
  linkedAccount?: String;
  theme?: Theme;
  distribution?: Object;
  language?: String;
  deeplink?: DeeplinkOptions;
  metadata?: Object;
  search?: Object;
  handoff?: String;
  experiments?: Object;
  tasks: Task[];
  customer?: Customer;
  deferredPaymentMethodStrategy?: String;
}

export const {
  Product,
  Scope,
  Environment,
  DeferredPaymentMethodStrategy,
  PresentationStyles,
  App,
  Step,
} = CONSTANTS;
export type {
  TransactEnvironment,
  PresentationStyleIOS,
  AppType,
  StepType,
} from './constants';
export type { DeeplinkOptions };

export const Atomic = {
  transact({
    config,
    environment,
    onInteraction,
    onFinish,
    onDataRequest,
    onClose,
    onAuthStatusUpdate,
    onTaskStatusUpdate,
    presentationStyleIOS,
    setDebug,
  }: {
    config: Config;
    environment?: CONSTANTS.TransactEnvironment;
    onInteraction?: Function;
    onDataRequest?: Function;
    onAuthStatusUpdate?: Function;
    onTaskStatusUpdate?: Function;
    onFinish?: Function;
    onClose?: Function;
    presentationStyleIOS?: PresentationStyleIOS;
    setDebug?: boolean;
  }): void {
    config.language = config.language || 'en';
    config.theme = config.theme || {};
    config.theme.dark =
      config.theme.dark !== undefined
        ? config.theme.dark
        : Appearance.getColorScheme() === 'dark';

    const args = {
      TransactReactNative,
      config,
      environment: environment || CONSTANTS.Environment.production,
      onInteraction,
      onFinish,
      onDataRequest,
      onClose,
      onAuthStatusUpdate,
      onTaskStatusUpdate,
      presentationStyleIOS,
      setDebug,
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
  presentAction({
    id,
    environment,
    presentationStyleIOS,
    onLaunch,
    onFinish,
    onClose,
    onAuthStatusUpdate,
    onTaskStatusUpdate,
    setDebug,
  }: {
    id: String;
    environment?: CONSTANTS.TransactEnvironment;
    presentationStyleIOS?: PresentationStyleIOS;
    onLaunch?: Function;
    onFinish?: Function;
    onClose?: Function;
    onAuthStatusUpdate?: Function;
    onTaskStatusUpdate?: Function;
    setDebug?: boolean;
  }): void {
    const args = {
      TransactReactNative,
      id,
      environment: environment || CONSTANTS.Environment.production,
      presentationStyleIOS,
      onLaunch,
      onFinish,
      onClose,
      onAuthStatusUpdate,
      onTaskStatusUpdate,
      setDebug,
    };

    switch (Platform.OS) {
      case 'ios':
        AtomicIOS.presentAction(args);
        break;
      case 'android':
        AtomicAndroid.presentAction(args);
        break;
      default:
        throw new Error(`Unsupported OS: ${Platform.OS}`);
    }
  },
  hideTransact() {
    switch (Platform.OS) {
      case 'ios':
        AtomicIOS.hideTransact(TransactReactNative);
        break;
      case 'android':
        throw new Error(`Unsupported OS: ${Platform.OS}`);
      default:
        throw new Error(`Unsupported OS: ${Platform.OS}`);
    }
  },
};
