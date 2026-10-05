import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Linking, Platform, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Atomic } from '@atomicfi/transact-react-native';
import type { PausedTransactRef } from '@atomicfi/transact-react-native';
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

// A bridge rejection carries the native error code alongside its message.
const describeError = (error: unknown) => {
  const { code, message } = (error ?? {}) as {
    code?: unknown;
    message?: unknown;
  };
  return code ? `${code}: ${message}` : String(error);
};

export default function App() {
  const [status, setStatus] = useState('Waiting for a launch intent…');
  // The iOS specs read this by accessibility id and expect the text 'paused' after
  // `atomictest://pause`, mirroring the native iOS test app's PauseStatus label.
  const [pauseStatus, setPauseStatus] = useState('');
  const lastLaunchId = useRef<string | null>(null);
  const pausedTransact = useRef<PausedTransactRef | null>(null);
  // Commands run one at a time, so a resume sent right behind a pause waits for its ref.
  const commandQueue = useRef<Promise<void>>(Promise.resolve());

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

  /**
   * Pause and resume commands: `atomictest://pause` / `resume` deep links on iOS,
   * `PAUSE_TRANSACT` / `RESUME_TRANSACT` broadcasts on Android.
   *
   * The Android specs wait for the `Transact paused` / `Transact resumed` log lines and the iOS
   * specs for PauseStatus to read `paused`, as the native test apps report them. Failures are
   * worded to match neither.
   */
  const runCommand = useCallback((command: string) => {
    const run = async () => {
      switch (command.toUpperCase()) {
        case 'PAUSE':
        case 'PAUSE_TRANSACT':
          setPauseStatus('');
          try {
            pausedTransact.current = await Atomic.pauseTransact();
            log('Transact paused');
            setPauseStatus('paused');
          } catch (error) {
            log(`Error pausing transact: ${describeError(error)}`);
            setPauseStatus('pause-error');
          }
          return;
        case 'RESUME':
        case 'RESUME_TRANSACT': {
          // Cleared rather than set to 'resumed': the spec pauses twice in one launch and reads
          // PauseStatus the moment it appears, so nothing from the first round may linger.
          setPauseStatus('');
          const paused = pausedTransact.current;
          if (!paused) {
            log('No paused Transact to resume');
            setPauseStatus('resume-error');
            return;
          }
          try {
            await paused.resume();
            pausedTransact.current = null;
            log('Transact resumed');
          } catch (error) {
            log(`Error resuming transact: ${describeError(error)}`);
            setPauseStatus('resume-error');
          }
          return;
        }
      }
    };
    commandQueue.current = commandQueue.current.then(run);
  }, []);

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

      // The native test apps implement this; the RN bridge has no equivalent, so say so rather than
      // launching and letting the spec time out with no explanation.
      const customFlow = extras.TRANSACT_CUSTOM_FLOW?.toUpperCase();
      if (customFlow) {
        log(`Custom flow requested: ${customFlow}`);
        if (customFlow === 'FRAGMENT_FLOW') {
          log(
            'Custom flow FRAGMENT_FLOW is not supported: the React Native SDK presents Transact itself and exposes no fragment host.'
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
          // The bridge reports statuses in lower case; the native test app logs the SDK's enum
          // names, which is what the specs match.
          const state = String(
            update?.status ?? stringify(update)
          ).toUpperCase();
          log(`RECEIVER auth status updated ${state}`);

          if (
            state === 'AUTHENTICATED' &&
            customFlow === 'DISMISS_ON_AUTH_STATUS_UPDATE_AUTHENTICATED'
          ) {
            log('Hiding Transact on AUTHENTICATED');
            Atomic.hideTransact();
            // The native iOS test app then shows an alert titled with the custom flow name, which
            // is what the spec asserts on (`~DISMISS_ON_AUTH_STATUS_UPDATE_AUTHENTICATED`). The
            // Android spec looks for this app's home screen instead.
            //
            // It has to wait until Transact is actually gone: RN presents alerts from the topmost
            // view controller, so one fired while Transact is still dismissing is silently dropped.
            // enqueueAlert defers presentation briefly for that reason.
            if (Platform.OS === 'ios') {
              enqueueAlert(customFlow);
            }
          }
        },
        onTaskStatusUpdate: (update: any) => {
          // Upper case for the same reason as the auth status above.
          const state = String(
            update?.status ?? stringify(update)
          ).toUpperCase();
          log(`RECEIVER task status updated ${state}`);
          // The iOS deferred-payment spec waits for an alert titled exactly 'Task Completed'. Like the
          // native iOS test app, skip it when a handoff is configured: it would sit on top of the
          // 'Finished with Handoff' alert the handoff spec looks for.
          if (
            Platform.OS === 'ios' &&
            !config.handoff &&
            state === 'COMPLETED'
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

          // The same card and identity the native and Flutter test apps send. The SDKs drop keys
          // they don't model, so it has to be `postalCode`: sent as `zipCode`, it never arrives and
          // the Android task stalls after the data request.
          const response = {
            card: { number: '4111222233334444', expiry: '12/29', cvv: '444' },
            identity: {
              firstName: 'first',
              lastName: 'last',
              postalCode: '12345',
              address: 'somewhere',
              address2: '',
              city: 'someplace',
              state: 'UT',
            },
          };

          if (Platform.OS === 'ios') {
            // Like the native iOS test app, hold the response until the spec taps '~RESPOND!', which
            // proves the request reached the host app. The bridge awaits the returned promise.
            // Responding straight away lets the task finish first, and the 'Task Completed' alert
            // then takes the place of this one before the spec can tap it.
            return new Promise((resolve) => {
              Alert.alert('Data request', 'Respond to the data request', [
                {
                  text: 'RESPOND!',
                  onPress: () => {
                    log('Sent data response');
                    resolve(response);
                  },
                },
              ]);
            });
          }

          // The Android deferred-payment spec waits for this log line.
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
      runCommand(command);
    };

    Linking.getInitialURL().then(handleCommandUrl);
    const urlSub = Linking.addEventListener('url', (event) =>
      handleCommandUrl(event.url)
    );

    const commandSub = harnessEvents?.addListener(
      'AppiumHarnessCommand',
      (event: { command?: string; extras?: Record<string, string> }) => {
        log(`RECEIVER command ${event?.command} ${stringify(event?.extras)}`);
        if (event?.command) {
          runCommand(event.command);
        }
      }
    );

    return () => {
      launchSub?.remove();
      commandSub?.remove();
      urlSub.remove();
    };
  }, [launch, runCommand]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {/* Only while set: an empty element would still match `~PauseStatus`, and the spec reads its
          text the moment it appears. testID only, like the native app's accessibilityIdentifier:
          an accessibilityLabel would replace the text XCUITest reads. In the layout rather than
          pinned to the top, where the status bar covers it and XCUITest counts it as not visible. */}
      {pauseStatus ? (
        <Text testID="PauseStatus" style={styles.pauseStatus}>
          {pauseStatus}
        </Text>
      ) : null}
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
    marginBottom: 12,
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
