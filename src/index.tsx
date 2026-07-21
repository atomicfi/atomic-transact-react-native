import { Appearance, NativeModules, Platform } from 'react-native';
import { AtomicIOS } from './ios';
import { AtomicAndroid } from './android';
import * as CONSTANTS from './constants';
import type { PresentationStyleIOS, AppType, StepType } from './constants';
import pkg from '../package.json';
import {
  addTransaction,
  createInstanceId,
  removeTransaction,
} from './transactRegistry';

const wrapperVersion: string = pkg.version;

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
  operation?: String;
  distribution?: Object;
  navigationOptions?: Object;
  apps?: AppType[];
  action?: { id: String };
  headless?: boolean;
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

export interface TransactTask {
  /** Wrapper-generated id for this launch; every event for this task carries it. */
  instanceId: string;
  /**
   * Stop receiving this task's callbacks on the JS side. Does not close the native UI
   * (iOS dismiss is process-global); use it to detach a task you no longer care about.
   */
  remove(): void;
}

export const Atomic = {
  transact({
    config,
    environment,
    onInteraction,
    onLaunch,
    onFinish,
    onDataRequest,
    onClose,
    onAuthStatusUpdate,
    onTaskStatusUpdate,
    onCleanup,
    onError,
    presentationStyleIOS,
    setDebug,
  }: {
    config: Config;
    environment?: CONSTANTS.TransactEnvironment;
    onInteraction?: Function;
    onDataRequest?: Function;
    onAuthStatusUpdate?: Function;
    onTaskStatusUpdate?: Function;
    onLaunch?: Function;
    onFinish?: Function;
    onClose?: Function;
    onCleanup?: Function;
    /** In-flow SDK error. iOS only — Android surfaces no equivalent callback. */
    onError?: Function;
    presentationStyleIOS?: PresentationStyleIOS;
    setDebug?: boolean;
  }): TransactTask {
    config.language = config.language || 'en';
    config.theme = config.theme || {};
    config.theme.dark =
      config.theme.dark !== undefined
        ? config.theme.dark
        : Appearance.getColorScheme() === 'dark';

    // One id per launch. Register the handlers BEFORE the native call so a fast-emitting
    // native side can't deliver an event before the registry entry exists.
    const instanceId = createInstanceId();
    addTransaction(instanceId, {
      onInteraction,
      onDataRequest,
      onAuthStatusUpdate,
      onTaskStatusUpdate,
      onLaunch,
      onFinish,
      onClose,
      onCleanup,
      onError,
    });

    const args = {
      TransactReactNative,
      instanceId,
      config,
      environment: environment || CONSTANTS.Environment.production,
      wrapperVersion,
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
        removeTransaction(instanceId);
        throw new Error(`Unsupported OS: ${Platform.OS}`);
    }

    return { instanceId, remove: () => removeTransaction(instanceId) };
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
