# Atomic Transact React Native Example App

A demo/testing harness for `@atomicfi/transact-react-native`, built with Expo. It
mirrors the structure of the native iOS and Android demo apps so you can exercise
the full Transact experience — Pay Link, User Link, and **Actions** flows — and
watch every SDK callback on-device.

The **Actions** tab is a port of the iOS SDK demo app's Actions screen, built to
test the complete action flow end-to-end.

## Setup

This example is a workspace member. From the repository root:

```bash
yarn install       # installs all workspaces and builds the library (bob)
yarn run prepare   # rebuild the library after changing src/
```

Because the app uses native modules, it must run in an **Expo Dev Client** (not
Expo Go):

```bash
yarn example ios       # build + run on an iOS simulator
yarn example android   # build + run on an Android emulator
yarn example start     # start Metro (dev client already installed)
```

## Screens

The app uses a five-tab layout plus two pushed sub-screens.

### Settings

Configure everything shared across flows (persisted on device):

- **Public Token** — paste a token; a banner warns if it's missing or >24h old.
- **Environment** — Production / Sandbox / Custom (custom reveals Transact + API
  URL fields).
- **Theme** — brand color, overlay color, and dark mode (Dark / Light / System),
  applied to every launch.
- **Language** — System / English / Spanish / French.
- **Debug** — enables webview inspection and SDK debug logging.
- **Present Fullscreen** (iOS) — use `fullScreen` instead of `formSheet`.

There is no in-app token generation — generate a public token from your backend
or the Atomic dashboard and paste it here.

### Pay Link

Configure and launch a `pay-link` flow: task selection (Switch / Bill
Presentment / Payments Hub), Payments Hub apps, starting screen (Welcome /
Search / Company Login), a company picker, and "Use SDK Payment Response"
(`deferredPaymentMethodStrategy`). Tap the code icon in the header to preview the
config JSON before launching.

### User Link

Configure and launch a `user-link` flow: Direct Deposit Switching and/or Payroll
Data, starting screen, a company picker, and an optional Search Rule ID.

### Actions

Test custom actions end-to-end:

- **Fetch Latest Actions** — calls `GET /pay-link/accounts` with your public
  token and groups the response into accounts, bills, and actions.
- **Change Actions** — paste actions JSON (a full `pay-link/accounts` response, a
  grouped array, or a flat `[{ type, actionId }]` array) via the editor, with a
  "Paste From Clipboard" shortcut.
- Each account is a collapsible section with one launch button per action.
- **Headless** toggles headless action execution.
- A warning appears when the actions are more than an hour old.

### Events

A real-time, on-screen log of every SDK callback (`onLaunch`, `onInteraction`,
`onDataRequest`, `onAuthStatusUpdate`, `onTaskStatusUpdate`, `onFinish`,
`onClose`) — the primary debugging surface. Filter by type, sort, clear, and tap
any event to inspect its raw JSON payload. For actions, `onTaskStatusUpdate`
surfaces the `actionType`.

## Testing the full action flow

1. **Settings** → paste a sandbox public token, pick the Sandbox environment.
2. **Actions** → **Fetch Latest Actions** (or paste JSON via **Change Actions**).
3. Expand an account and tap an action (try Headless on and off).
4. **Events** → watch the callback stream and inspect raw payloads.

## Platform notes

- Actions run through `Atomic.transact()` with a task of
  `{ operation: 'action', action: { id }, headless }` and `scope: 'pay-link'` —
  there is no separate `presentAction()` API.
- The `onDataRequest → response` round-trip and `hideTransact` ("dismiss after
  auth") are iOS-only in the RN bridge, so the Data Request Provider screen and
  dismiss-after-auth toggle from the native demos are intentionally omitted.

## Scripts

```bash
# from the example directory
yarn start     # Metro bundler
yarn ios       # build + run on iOS
yarn android   # build + run on Android
yarn lint      # ESLint
```

## Links

- [Atomic Transact React Native docs](https://docs.atomicfi.com/reference/transact-sdk#libraries__react-native)
- [Expo Dev Client](https://docs.expo.dev/development/build/)
