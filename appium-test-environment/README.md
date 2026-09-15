# AppiumTestEnvironment (React Native)

The React Native counterpart to `atomic-transact-android/AppiumTestEnvironment` and the iOS test
app. It exists so the shared conformance suite in
[`mobile-conformance-tests`](https://github.com/atomicfi/mobile-conformance-tests) can run against
the React Native wrapper **without any changes to the suite**.

It presents no UI beyond a status line: the suite launches it with `TRANSACT_*` intent extras and it
immediately presents Transact with that configuration.

## The contract

The suite drives the native test apps in three ways, none of which React Native can reach on its
own. `plugin/withAppiumTestEnvironment.js` injects the native pieces at prebuild time.

| What the suite does | How it's satisfied here |
| --- | --- |
| Starts `<package>/.MainActivity` with `TRANSACT_*` extras | `app.json` sets the package id; `AppiumHarnessModule.getLaunchExtras()` reads the intent |
| Relaunches with fresh extras | Activity is `singleTask`; the module emits `AppiumHarnessLaunch` on resume, deduped by `TRANSACT_LAUNCH_ID` |
| Broadcasts to `.TransactCommandReceiver` by explicit component | Manifest-declared receiver relays to JS (a runtime-registered receiver is not addressable by component) |
| Greps logcat for `AppiumTestEnvironment` | `AppiumHarnessModule.log()` writes under that tag — RN's own `console.log` would land under `ReactNativeJS` |
| Looks for the home screen text `AppiumTestEnvironment` | Rendered by `App.tsx` |

On iOS the contract is different: parameters arrive as **process environment variables** (via
`mobile:launchApp`), and the specs assert on native UI rather than logs.

| What the suite does | How it's satisfied here |
| --- | --- |
| Passes `TRANSACT_*` as launch environment variables | `AppiumHarness.m` reads `NSProcessInfo` — Metro inlines `process.env` at build time, so JS cannot |
| Sends `atomictest://pause` / `resume` deep links | `expo.scheme` registers `atomictest`; RN `Linking` handles them |
| Reads the `PauseStatus` element | Rendered by `App.tsx` |
| Waits for alerts titled `Task Completed` / `Finished with Handoff: …`, taps `RESPOND!` | `Alert.alert` — RN renders a real `UIAlertController`, so XCUITest sees those labels |

`android/` and `ios/` are gitignored — the plugin recreates all of it on every prebuild.

## Building

The suite needs a **standalone** build: no dev client, no Metro. A dev-client build would sit at the
dev launcher with no JS loaded once Appium reinstalls the APK (installing resets the app storage
that holds the bundle URL).

Android, locally:

```bash
yarn appium-app prebuild
cd android && ./gradlew :app:assembleRelease -x lint
# -> android/app/build/outputs/apk/release/app-release.apk
```

iOS, locally:

```bash
npx expo prebuild --clean --platform ios
cd ios && LANG=en_US.UTF-8 pod install
xcodebuild -workspace AppiumTestEnvironment.xcworkspace -scheme AppiumTestEnvironment \
  -configuration Release -sdk iphonesimulator -destination 'id=<simulator udid>' \
  -derivedDataPath ./build CODE_SIGNING_ALLOWED=NO build
# -> ios/build/Build/Products/Release-iphonesimulator/AppiumTestEnvironment.app
```

`LANG` on the `pod install` matters: without a UTF-8 locale CocoaPods dies in Ruby's unicode
normalization (`Unicode Normalization not appropriate for ASCII-8BIT`) before it reads the Podfile.

Via EAS (the `appium` profile is standalone — `developmentClient: false`, internal distribution,
APK rather than AAB so Appium can install it):

```bash
yarn appium-app build:android
```

## Running the conformance suite against it

```bash
cd mobile-conformance-tests/appium

# android
ANDROID_APP_PACKAGE=com.atomicfi.appiumtestenvironment.rn \
  ANDROID_APP_PATH=/path/to/app-release.apk \
  npm run wdio:android

# ios
IOS_BUNDLE_ID=com.atomicfi.AppiumTestEnvironment.rn \
  IOS_APP_PATH=/path/to/AppiumTestEnvironment.app \
  npm run wdio:ios
```

This app has its own identifier (`com.atomicfi.appiumtestenvironment.rn`), so it installs alongside
the native test app rather than replacing it, and `ANDROID_APP_PACKAGE` selects which one a run
drives. Everything native is derived from `expo.android.package` by the config plugin — the Kotlin
package, the broadcast action, and the manifest-relative receiver name — so changing the id in
`app.json` is sufficient.

## Known gaps

These are React Native bridge limitations, not harness defects. In each case the harness logs that
the feature is unsupported so a failing spec says why rather than timing out silently.

- **Pause/resume** (`pauseTransact.e2e.ts`) — the bridge exposes no equivalent of the native SDK's
  pause/resume. Affects both platforms.
- **`FRAGMENT_FLOW`** (`c1PaylinkFlow.e2e.ts`) — the RN SDK presents Transact itself and exposes no
  fragment host.
- **`DISMISS_ON_AUTH_STATUS_UPDATE_AUTHENTICATED`** (`authStatusUpdate.e2e.ts`) — works on iOS,
  unsupported on Android: `Atomic.hideTransact()` is iOS-only in the bridge. The Android harness
  logs that when the flow is requested.

## Gotchas worth knowing

Things that cost real debugging time here:

- **`hideTransact` is a hide, not a close.** It emits no `onClose`/`onCleanup`, and the task keeps
  running — Transact re-presents itself afterwards to show the summary. Do not treat the absence of
  a close callback as evidence that it failed.
- **Alerts must be queued.** iOS shows only the topmost alert and the specs match on it by title, so
  a second alert presented while one is up hides the first from XCUITest. The auth-dismiss flow and
  the task-completed alert land within a second of each other. `enqueueAlert` serializes them; the
  native iOS test app does the same thing with its `nextAlertPresentation`.
- **The `atomictest://` scheme collides with the native iOS test app**, which registers it too. With
  both installed, `simctl openurl` routes to whichever iOS picks, so deep-link commands can land in
  the wrong app. Anything relying on those (`pauseTransact`) needs a distinct scheme first.
- **RN's `Linking` does not receive those URLs anyway.** The generated `AppDelegate` does
  `super.application(app, open:options:) || RCTLinkingManager.application(...)`, so when Expo's
  implementation handles the URL and returns true, `RCTLinkingManager` is never called and JS sees
  no `url` event. A command channel here needs an Expo AppDelegate subscriber or `expo-linking`.
- **Deferred payment data response** (`deferredPayment.e2e.ts`) — the `onDataRequest` response only
  round-trips on iOS; on Android the returned value never reaches the SDK.
