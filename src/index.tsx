import { Appearance, NativeModules, Platform } from 'react-native';
import { AtomicIOS } from './ios';
import { AtomicAndroid } from './android';
import * as CONSTANTS from './constants';
import type {
  PresentationStyleIOS,
  AppType,
  StepType,
  HandoffType,
} from './constants';
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
  /**
   * Views to hand off to the host app instead of showing them, e.g.
   * `[Handoff.AUTHENTICATION_SUCCESS]`. Transact emits `onFinish` or `onClose` in their
   * place, with `handoff` set in the event data. Must be an array, as in the native SDKs.
   */
  handoff?: HandoffType[];
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
  Handoff,
} = CONSTANTS;
export type {
  TransactEnvironment,
  PresentationStyleIOS,
  AppType,
  StepType,
  HandoffType,
} from './constants';
export type { DeeplinkOptions };

export interface TransactTask {
  /** Wrapper-generated id for this launch; every event for this task carries it. */
  instanceId: string;
  /**
   * Stop receiving this task's callbacks on the JS side. Does not close the native UI
   * (hideTransact is process-global); use it to detach a task you no longer care about.
   */
  remove(): void;
}

export interface PauseTransactOptions {
  /** Animate Transact out. Defaults to `true`. Android ignores it. */
  animated?: boolean;
}

export interface ResumeTransactOptions {
  /** Animate Transact back in. Defaults to `true`. Android ignores it. */
  animated?: boolean;
}

/** A paused Transact session, returned by `Atomic.pauseTransact()`. */
export interface PausedTransactRef {
  /**
   * Presents the paused Transact again, from the app's topmost screen. Resolves once it's back.
   *
   * Rejects with `no_paused_transact` once this session has been resumed or has ended. Rejects
   * with `no_presenting_view_controller` (iOS) or `no_activity` (Android) while the app has no
   * screen to present from, and with `resume_failed` (Android) if the SDK can't show it. The
   * session stays paused in those cases, so resume again once the app is in the foreground.
   */
  resume(options?: ResumeTransactOptions): Promise<void>;
}

// Names each paused session for the native side, which holds the SDK's PausedTransactRef: it
// can't cross the bridge. Process-unique, like a task's instanceId.
let pauseCount = 0;

// Pause and resume work the same way on both platforms, so they share one entry point.
function pausePlatform(): typeof AtomicIOS | typeof AtomicAndroid {
  switch (Platform.OS) {
    case 'ios':
      return AtomicIOS;
    case 'android':
      return AtomicAndroid;
    default:
      throw new Error(`Unsupported OS: ${Platform.OS}`);
  }
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
    /**
     * In-flow SDK error. iOS only — Android surfaces no equivalent callback. Also called with
     * `{ code, message }` when Transact fails to launch: `no_presenting_view_controller`,
     * `config_serialization_failed` or `config_decode_failed`.
     */
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

    // Transact only accepts an array: iOS fails to decode anything else, and on Android Transact
    // rejects the config as invalid. This type used to declare a string, so wrap one.
    if (typeof config.handoff === 'string') {
      config.handoff = [config.handoff];
    }

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
        AtomicAndroid.hideTransact(TransactReactNative);
        break;
      default:
        throw new Error(`Unsupported OS: ${Platform.OS}`);
    }
  },
  /**
   * Hides the presented Transact and returns a reference to present it again later, e.g. to
   * show one of your own screens mid-flow. Resolves once Transact has left the screen.
   *
   * Like the native SDKs, it pauses a Transact rather than a particular task. Don't call it while
   * an action is running, even alongside a presented Transact: on iOS it hides both and the ref
   * may bring back only the action, and on Android it may pause the action and leave the
   * presented Transact on screen.
   *
   * The session stays alive while paused. Its `onTaskStatusUpdate` and `onAuthStatusUpdate`
   * callbacks keep arriving. No `onClose` or `onCleanup` fires for the pause. Your app can't close
   * a paused session, so resume it when you're done: one that's never resumed keeps running until
   * Transact ends it itself (e.g. on a handoff) or the app's process exits.
   *
   * On Android, JS timers don't run while Transact covers the app, so call this from a callback
   * or another event rather than a `setTimeout`.
   *
   * Rejects with `transact_not_presented` when no Transact is showing, `transact_already_paused`
   * when it's already paused, or `pause_failed`.
   */
  async pauseTransact({
    animated = true,
  }: PauseTransactOptions = {}): Promise<PausedTransactRef> {
    // Inside an async function, so an unsupported OS or an unlinked module rejects too.
    const platform = pausePlatform();
    pauseCount += 1;
    const pauseId = `rn-pause-${pauseCount}-${Date.now()}`;

    await platform.pauseTransact(TransactReactNative, pauseId, animated);
    return {
      resume: async ({ animated: resumeAnimated = true } = {}) =>
        platform.resumeTransact(TransactReactNative, pauseId, resumeAnimated),
    };
  },
};
