import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Linking, Platform, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Atomic } from '@atomicfi/transact-react-native';
import {
  buildConfig,
  buildEnvironment,
  isLaunchable,
} from './src/launchConfig';
import type { LaunchExtras } from './src/launchConfig';
import {
  getLaunchExtras,
  harnessEvents,
  isHarnessAvailable,
  log,
} from './src/harness';

/**
 * Appium test environment for the React Native Transact SDK.
 *
 * Presents no UI of its own beyond a status line — the conformance suite launches this app with
 * TRANSACT_* intent extras and it immediately presents Transact with that configuration, matching
 * what the native Android and iOS test apps do.
 */

const stringify = (value: unknown) => {
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
};

export default function App() {
  const [status, setStatus] = useState('Waiting for a launch intent…');
  // The iOS specs read this by accessibility id and expect the text 'paused' after
  // `atomictest://pause`, mirroring the native iOS test app's PauseStatus label.
  const [pauseStatus, setPauseStatus] = useState('');
  const lastLaunchId = useRef<string | null>(null);

  /**
   * Alerts are presented one at a time.
   *
   * iOS shows only the topmost alert, and the specs match on it by title — so a second alert
   * presented while one is up hides the first from XCUITest. In the auth-dismiss flow the task
   * completes moments after Transact hides, so the "Task Completed" alert would land on top of the
   * dismiss alert the spec is waiting for. The native iOS test app queues alerts the same way,
   * presenting the next only once the current one is acknowledged.
   */
  const alertQueue = useRef<{ title: string; message?: string }[]>([]);
  const alertShowing = useRef(false);

  const presentNextAlert = useCallback(() => {
    if (alertShowing.current) return;

    const next = alertQueue.current.shift();
    if (!next) return;

    alertShowing.current = true;
    log(`Presenting alert: ${next.title}`);
    Alert.alert(next.title, next.message, [
      {
        text: 'Okay',
        onPress: () => {
          alertShowing.current = false;
          presentNextAlert();
        },
      },
    ]);
  }, []);

  const enqueueAlert = useCallback(
    (title: string, message?: string) => {
      alertQueue.current.push({ title, message });
      // A short delay lets a dismissal animation finish; presenting into one is dropped by UIKit.
      setTimeout(presentNextAlert, 300);
    },
    [presentNextAlert]
  );

  const launch = useCallback(
    (extras: LaunchExtras) => {
      if (!isLaunchable(extras)) {
        const message =
          'Missing TRANSACT_PUBLIC_TOKEN, TRANSACT_URL, TRANSACT_PRODUCT_TYPE or TRANSACT_SCOPE_TYPE ' +
          'in the intent extras. This app launches Transact from those parameters; if the Appium ' +
          'suite is starting up, the run should relaunch with them shortly.';
        log(`transact-launch-error:missing-config`);
        setStatus(message);
        return;
      }

      const launchId = extras.TRANSACT_LAUNCH_ID ?? null;
      if (launchId && launchId === lastLaunchId.current) {
        log(`Ignoring duplicate launch: ${launchId}`);
        return;
      }
      lastLaunchId.current = launchId;

      const config = buildConfig(extras);
      const environment = buildEnvironment(extras);
      log(`Config: ${stringify(config)}`);
      setStatus('Transact launched');

      // The native test apps implement these; the RN bridge has no equivalent on Android, so say so
      // rather than launching and letting the spec time out with no explanation.
      const customFlow = extras.TRANSACT_CUSTOM_FLOW?.toUpperCase();
      if (customFlow) {
        log(`Custom flow requested: ${customFlow}`);
        if (customFlow === 'FRAGMENT_FLOW') {
          log(
            'Custom flow FRAGMENT_FLOW is not supported: the React Native SDK presents Transact itself and exposes no fragment host.'
          );
        } else if (
          customFlow === 'DISMISS_ON_AUTH_STATUS_UPDATE_AUTHENTICATED' &&
          Platform.OS === 'android'
        ) {
          log(
            'Custom flow DISMISS_ON_AUTH_STATUS_UPDATE_AUTHENTICATED is not supported on Android: Atomic.hideTransact() is iOS-only.'
          );
        }
      }

      Atomic.transact({
        config: config as any,
        environment,
        // The native Config ORs debug into webContentsDebuggingEnabled, which is what exposes the
        // Transact WebView to Appium as a WEBVIEW context.
        setDebug: true,
        onLaunch: () => {
          log('RECEIVER launch');
          log('callback:Launch');
        },
        onInteraction: (interaction: any) => {
          log(`RECEIVER interaction ${stringify(interaction)}`);
          log('callback:Interaction');
        },
        onAuthStatusUpdate: (update: any) => {
          const state = String(update?.status ?? stringify(update));
          log(`RECEIVER auth status updated ${state}`);

          if (
            state.toUpperCase() === 'AUTHENTICATED' &&
            customFlow === 'DISMISS_ON_AUTH_STATUS_UPDATE_AUTHENTICATED'
          ) {
            // Atomic.hideTransact() is iOS-only in the bridge, so this custom flow only works here.
            if (Platform.OS === 'ios') {
              log('Hiding Transact on AUTHENTICATED');
              Atomic.hideTransact();
              // The native iOS test app then shows an alert titled with the custom flow name, which
              // is what the spec asserts on (`~DISMISS_ON_AUTH_STATUS_UPDATE_AUTHENTICATED`).
              //
              // It has to wait until Transact is actually gone: RN presents alerts from the topmost
              // view controller, so one fired while Transact is still dismissing is silently dropped.
              // Driven off the close/cleanup callbacks rather than a fixed delay, with a backstop in
              // case neither fires.
              enqueueAlert(customFlow);
            }
          }
        },
        onTaskStatusUpdate: (update: any) => {
          const state = update?.status ?? stringify(update);
          log(`RECEIVER task status updated ${state}`);
          // The iOS deferred-payment spec waits for an alert titled exactly 'Task Completed'.
          if (
            Platform.OS === 'ios' &&
            String(state).toUpperCase() === 'COMPLETED'
          ) {
            enqueueAlert(
              'Task Completed',
              `company: ${update?.company?.name ?? 'unknown'}`
            );
          }
        },
        onDataRequest: (request: any) => {
          if (
            (
              extras.TRANSACT_DEFERRED_PAYMENT_METHOD_STRATEGY || ''
            ).toLowerCase() !== 'sdk'
          ) {
            return undefined;
          }
          log(`RECEIVER data request ${stringify(request?.fields ?? request)}`);

          const response = {
            card: { number: '4111222233334444', expiry: '12/29', cvv: '444' },
            identity: {
              firstName: 'first',
              lastName: 'last',
              zipCode: '12345',
              address: 'somewhere',
              city: 'someplace',
              state: 'UT',
            },
          };

          if (Platform.OS === 'ios') {
            // The native iOS test app gates the response behind an alert so the spec can prove the
            // request reached the host app; the spec taps '~RESPOND!'. The alert is informational
            // here — the bridge's onDataRequest is synchronous, so the response is returned either
            // way and tapping it is what the spec waits on.
            Alert.alert('Data request', 'Respond to the data request', [
              { text: 'RESPOND!' },
            ]);
          }

          // The RN bridge only round-trips this response on iOS; on Android the value returned here
          // does not reach the SDK, so deferred-payment specs cannot complete.
          log('Sent data response');
          return response;
        },
        onClose: (data: any) => {
          log(`RECEIVER close ${stringify(data)}`);
        },
        onFinish: (data: any) => {
          log(`RECEIVER finish ${stringify(data)}`);
          if (data?.handoff) {
            log(`Finished with Handoff: ${data.handoff}`);
            // The iOS handoff spec looks for an element labelled with this exact string.
            if (Platform.OS === 'ios') {
              enqueueAlert(`Finished with Handoff: ${data.handoff}`);
            }
          }
        },
        onCleanup: () => {
          log('callback:Cleanup');
        },
        onError: (error: any) => {
          log(`RECEIVER error ${stringify(error)}`);
        },
      });

      log(`transact-launch:${launchId ?? 'no-launch-id'}`);
    },
    [enqueueAlert]
  );

  useEffect(() => {
    if (!isHarnessAvailable) {
      setStatus(
        'Native harness module unavailable — run a build that includes the config plugin.'
      );
      return;
    }

    // Cold start: the extras the activity was launched with.
    getLaunchExtras().then((extras) => {
      if (Object.keys(extras).length > 0) {
        launch(extras as LaunchExtras);
      }
    });

    // Warm start: `singleTask` delivers a relaunch to the running activity.
    const launchSub = harnessEvents?.addListener(
      'AppiumHarnessLaunch',
      (event: { launchId?: string; extras?: Record<string, string> }) => {
        if (event?.extras) {
          launch(event.extras as LaunchExtras);
        }
      }
    );

    // iOS receives commands as `atomictest://<command>` deep links rather than broadcasts.
    const handleCommandUrl = (url: string | null) => {
      if (!url) return;
      const command = url.replace(/^atomictest:\/\//, '').split(/[/?]/)[0];
      if (!command) return;

      log(`RECEIVER command ${command}`);

      if (command === 'pause' || command === 'resume') {
        // The native iOS test app calls Atomic.pauseTransact() / resumeTransact() here. The React
        // Native bridge exposes neither, so the status label reports the gap instead of silently
        // leaving the spec to time out on a label that never changes.
        setPauseStatus('pause-unsupported');
        log(
          `Command ${command} is not supported: the React Native SDK exposes no pause/resume API.`
        );
      }
    };

    Linking.getInitialURL().then(handleCommandUrl);
    const urlSub = Linking.addEventListener('url', (event) =>
      handleCommandUrl(event.url)
    );

    const commandSub = harnessEvents?.addListener(
      'AppiumHarnessCommand',
      (event: { command?: string; extras?: Record<string, string> }) => {
        log(`RECEIVER command ${event?.command} ${stringify(event?.extras)}`);
        if (
          event?.command === 'PAUSE_TRANSACT' ||
          event?.command === 'RESUME_TRANSACT'
        ) {
          // The RN bridge exposes no pause/resume; logged so specs asserting on the broadcast
          // still see it arrive, and so the gap is visible rather than silent.
          log(
            `Command ${event.command} is not supported by the React Native SDK`
          );
        }
      }
    );

    return () => {
      launchSub?.remove();
      commandSub?.remove();
      urlSub.remove();
    };
  }, [launch]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text
        accessibilityLabel="PauseStatus"
        testID="PauseStatus"
        style={styles.pauseStatus}
      >
        {pauseStatus}
      </Text>
      <Text style={styles.title}>AppiumTestEnvironment</Text>
      <Text style={styles.status}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
    padding: 32,
  },
  pauseStatus: {
    color: '#444444',
    fontSize: 12,
    position: 'absolute',
    top: 8,
  },
  status: {
    color: '#444444',
    fontSize: 14,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
});
