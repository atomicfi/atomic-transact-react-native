import { Alert } from 'react-native';
import { Atomic } from '@atomicfi/transact-react-native';
import type { PausedTransactRef } from '@atomicfi/transact-react-native';
import { useSettings } from '../state/SettingsContext';
import { useEventLog, useTransactCallbacks } from '../state/EventLogContext';
import { useDataRequest } from '../state/DataRequestContext';

// The Pause & Resume developer setting: step out of Transact mid-flow, the way an
// app would to show one of its own screens, then bring it back.
const PAUSE_AFTER_LAUNCH_MS = 5000;

// A bridge rejection carries the native error code alongside its message.
const describeError = (error: unknown) => {
  const { code, message } = (error ?? {}) as {
    code?: unknown;
    message?: unknown;
  };
  return code ? `${code}: ${message}` : String(error);
};

export interface LaunchConfig {
  scope: string;
  tasks: any[];
  deeplink?: Record<string, unknown>;
  deferredPaymentMethodStrategy?: string;
  search?: Record<string, unknown>;
}

// Merges a per-screen scope/tasks/deeplink with the shared settings (token,
// theme, language) into the config object handed to Atomic.transact. Exposed on
// its own so screens can also render an accurate config preview.
export function useTransact(): {
  build: (launch: LaunchConfig) => Record<string, unknown>;
  launch: (launch: LaunchConfig) => void;
} {
  const {
    settings,
    transactEnvironment,
    theme,
    language,
    presentationStyleIOS,
  } = useSettings();
  const callbacks = useTransactCallbacks();
  const { logEvent } = useEventLog();
  const { makeResponse } = useDataRequest();

  // Stands in for the app's own screen. Resuming from a tap means the app is in
  // the foreground with a screen to present Transact from. If it still fails,
  // the session stays paused unless it has ended, so offer it again.
  const offerResume = (paused: PausedTransactRef) => {
    Alert.alert(
      'Transact paused',
      'Your app would show its own screen here.',
      [
        {
          text: 'Resume',
          onPress: async () => {
            try {
              await paused.resume();
              logEvent('resume', { body: 'Transact resumed', raw: {} });
            } catch (error) {
              logEvent('error', {
                body: `Resume failed: ${describeError(error)}`,
                raw: error,
              });
              if (
                (error as { code?: unknown })?.code !== 'no_paused_transact'
              ) {
                offerResume(paused);
              }
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const pause = async () => {
    try {
      const paused = await Atomic.pauseTransact();
      logEvent('pause', { body: 'Transact paused', raw: {} });
      offerResume(paused);
    } catch (error) {
      logEvent('error', {
        body: `Pause failed: ${describeError(error)}`,
        raw: error,
      });
    }
  };

  const build = (launch: LaunchConfig): Record<string, unknown> => {
    const config: Record<string, unknown> = {
      publicToken: settings.publicToken.trim(),
      scope: launch.scope,
      tasks: launch.tasks,
      theme,
    };
    if (language) config.language = language;
    if (launch.deeplink) config.deeplink = launch.deeplink;
    if (launch.deferredPaymentMethodStrategy) {
      config.deferredPaymentMethodStrategy =
        launch.deferredPaymentMethodStrategy;
    }
    if (launch.search) config.search = launch.search;
    return config;
  };

  const launch = (l: LaunchConfig) => {
    // Pause at the first interaction PAUSE_AFTER_LAUNCH_MS or more after launch.
    // Not a timer: Android stops JS timers while Transact covers the app. Actions
    // run in the background or behind their own UI, so there is no Transact on
    // screen to step out of.
    const launchedAt = Date.now();
    let pauseDue =
      settings.pauseAndResume &&
      !l.tasks.some((task) => task?.operation === 'action');

    Atomic.transact({
      config: build(l) as any,
      environment: transactEnvironment,
      presentationStyleIOS,
      setDebug: settings.debug,
      ...callbacks,
      onInteraction: (interaction: any) => {
        callbacks.onInteraction(interaction);
        if (pauseDue && Date.now() - launchedAt >= PAUSE_AFTER_LAUNCH_MS) {
          pauseDue = false;
          pause();
        }
      },
      // A session that has ended has nothing left to pause.
      onFinish: (response: any) => {
        pauseDue = false;
        callbacks.onFinish(response);
      },
      onClose: (response: any) => {
        pauseDue = false;
        callbacks.onClose(response);
      },
      // Log the request (via callbacks.onDataRequest) and return the configured
      // identity/card so deferred payments (deferredPaymentMethodStrategy: sdk)
      // can resolve.
      onDataRequest: (request: any) => {
        callbacks.onDataRequest(request);
        return makeResponse();
      },
    });
  };

  return { build, launch };
}
