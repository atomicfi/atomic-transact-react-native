import { Atomic } from '@atomicfi/transact-react-native';
import { useSettings } from '../state/SettingsContext';
import { useTransactCallbacks } from '../state/EventLogContext';
import { useDataRequest } from '../state/DataRequestContext';

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
  const { makeResponse } = useDataRequest();

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
    Atomic.transact({
      config: build(l) as any,
      environment: transactEnvironment,
      presentationStyleIOS,
      setDebug: settings.debug,
      ...callbacks,
      // Log the request (via callbacks.onDataRequest) and return the configured
      // identity/card so deferred payments (deferredPaymentMethodStrategy: sdk)
      // can resolve. The response round-trip is iOS-only in the RN bridge.
      onDataRequest: (request: any) => {
        callbacks.onDataRequest(request);
        return makeResponse();
      },
    });
  };

  return { build, launch };
}
