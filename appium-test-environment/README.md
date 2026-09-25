# AppiumTestEnvironment (React Native)

The React Native counterpart to the native Android and iOS Appium test apps. It exists so the
shared conformance suite in
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
| Sends `atomictest://pause` / `resume` deep links | `expo.scheme` registers `atomictest`; `App.tsx` listens through RN `Linking`, which does not receive them yet (see Gotchas) |
| Reads the `PauseStatus` element | Rendered by `App.tsx` |
| Waits for alerts titled `Task Completed` / `Finished with Handoff: …`, taps `RESPOND!` | `Alert.alert` — RN renders a real `UIAlertController`, so XCUITest sees those labels |

`android/` and `ios/` are gitignored — the plugin recreates all of it on every prebuild.

## Building

The suite needs a **standalone** build: no dev client, no Metro. A dev-client build would sit at the
dev launcher with no JS loaded once Appium reinstalls the app, because installing resets the app
storage that holds the bundle URL.

### Local toolchain (fast, use while iterating)

```bash
yarn appium-app build:local:android   # -> android/app/build/outputs/apk/release/app-release.apk
yarn appium-app build:local:ios       # -> ios/build/Build/Products/Release-iphonesimulator/AppiumTestEnvironment.app
```

Each runs `expo prebuild --clean` and then Gradle or xcodebuild, printing the artifact path. Two
things they handle that are easy to get wrong by hand:

- **JDK 17** is pinned via `/usr/libexec/java_home -v 17`. Newer JDKs fail inside the Kotlin Gradle
  plugin with an internal compiler error.
- **A UTF-8 locale** is set for anything that runs CocoaPods. Without it `pod install` dies in
  Ruby's unicode normalization (`Unicode Normalization not appropriate for ASCII-8BIT`) before it
  even reads the Podfile.

### EAS

```bash
yarn appium-app build:eas:android         # cloud
yarn appium-app build:eas:ios
yarn appium-app build:eas:android:local   # same pipeline, on this machine
yarn appium-app build:eas:ios:local
```

CI uses the local-toolchain scripts; use the EAS builds when you want Expo's pipeline instead.

**`--local` builds from git, not your working tree.** EAS archives the project through the VCS, so
uncommitted changes are silently excluded and you can end up testing stale code. (It is also what
surfaces filename-casing mismatches: a `.gitignore` entry whose case does not match the file is
invisible on macOS but fails the EAS upload.) Commit first, or use the local-toolchain scripts while
iterating. They are also clean builds each time, where xcodebuild reuses `derivedDataPath`.

## CI

`.github/workflows/appium-e2e.yml` runs on every pull request: lint/typecheck/unit tests, then
builds this app for both platforms with the local-toolchain scripts above and runs the conformance
suite against it on a GitHub-hosted Android emulator and iOS simulator.

Each test job runs the suite's `wdio:android:rn` / `wdio:ios:rn` script, which sets
`TARGET_APP_KIND=react-native` and this app's identifier, because the suite defaults to the native
test apps. `TARGET_APP_KIND` also gates the specs covering APIs this wrapper does not expose, so
they report as skipped rather than failing.

For real devices, the `appium-device` EAS profile produces a signed `.ipa` instead of the simulator
build that CI and the local scripts use.

## Running the conformance suite against it

```bash
cd mobile-conformance-tests/appium

# android
ANDROID_APP_PATH=/path/to/app-release.apk npm run wdio:android:rn

# ios
IOS_APP_PATH=/path/to/AppiumTestEnvironment.app npm run wdio:ios:rn
```

The `:rn` scripts set `TARGET_APP_KIND=react-native` and this app's identifier. Without them the
suite drives the native test app and runs the specs this wrapper can't satisfy.

On iOS the suite does not reinstall an app that is already on the simulator, so after a rebuild
remove the old one first: `xcrun simctl uninstall booted com.atomicfi.AppiumTestEnvironment.rn`.

This app has its own identifier (`com.atomicfi.appiumtestenvironment.rn`), so it installs alongside
the native test app rather than replacing it. Everything native is derived from
`expo.android.package` by the config plugin — the Kotlin package, the broadcast action, and the
manifest-relative receiver name — so within this app, changing the id in `app.json` is sufficient;
the suite's `:rn` scripts name it too.

## Gotchas worth knowing

Behaviors that are easy to trip over:

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
