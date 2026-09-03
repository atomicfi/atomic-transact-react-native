# Contributing

Contributions are always welcome, no matter how large or small!

We want this community to be friendly and respectful to each other. Please follow it in all your interactions with the project. Before contributing, please read the [code of conduct](./CODE_OF_CONDUCT.md).

## Development workflow

To get started with the project, run `yarn` in the root directory to install the required dependencies for each package:

```sh
yarn
```

> While it's possible to use [`npm`](https://github.com/npm/cli), the tooling is built around [`yarn`](https://classic.yarnpkg.com/), so you'll have an easier time if you use `yarn` for development.

While developing, you can run the [example app](/example/) to test your changes. Any changes you make in your library's JavaScript code will be reflected in the example app without a rebuild. If you change any native code, then you'll need to rebuild the example app.

To start the packager:

```sh
yarn example start
```

To run the example app on Android:

```sh
yarn example android
```

To run the example app on iOS:

```sh
yarn example ios
```

Make sure your code passes TypeScript and ESLint. Run the following to verify:

```sh
yarn typecheck
yarn lint
```

To fix formatting errors, run the following:

```sh
yarn lint --fix
```

Remember to add tests for your change if possible. Run the unit tests by:

```sh
yarn test
```

To edit the Objective-C or Swift files, open `example/ios/TransactReactNativeExample.xcworkspace` in XCode and find the source files at `Pods > Development Pods > @atomicfi/transact-react-native`.

To edit the Java or Kotlin files, open `example/android` in Android studio and find the source files at `atomicfi-transact-react-native` under `Android`.

### Dependency updates

Dependabot manages tooling and dependencies that can move independently. Expo
packages whose ranges can move within the current SDK are grouped into a single
patch pull request instead of being included in general dependency batches.
Minor and major Expo-family updates are grouped separately. Exact React and
React Native pins remain controlled by Expo's compatibility data rather than by
newer registry versions alone.

Expo alignment is automatic. When Dependabot opens or refreshes either Expo
group, a read-only workflow runs Expo's fixer and packages its JSON changes. A
separate trusted workflow validates those changes, regenerates the lockfile with
package lifecycle scripts disabled, and commits the result back to the
Dependabot branch. When changes are needed, that follow-up commit retriggers
normal PR checks, and Dependabot may continue to rebase the branch without
manual intervention.

The dependency automation uses a GitHub App installed only on this repository
with `Contents: read and write` and `Pull requests: read and write`. Its client
ID is stored in the `DEPENDENCY_AUTOMATION_APP_CLIENT_ID` Actions variable and
its private key in the `DEPENDENCY_AUTOMATION_APP_PRIVATE_KEY` Actions secret.
The Expo alignment job downscopes its token to contents only, and no dependency
lifecycle or pull-request-supplied code runs in the job that receives that
credential.

The same App creates iOS SDK update pull requests, allowing the person who
triggered an SDK release to review them. Because `update-ios-sdk.yml` is called
from the iOS repositories, make the variable and secret available to those
caller repositories (preferably as organization-level Actions configuration
limited to `atomic-transact-react-native`, `atomic-transact-ios`, and `ios-sdk`)
and pass them to the reusable workflow. Pin the reusable workflow to its full
commit SHA before sharing the App private key:

```yaml
uses: atomicfi/atomic-transact-react-native/.github/workflows/update-ios-sdk.yml@<full-commit-sha>
with:
  version: ${{ needs.get-version.outputs.version }}
  app_client_id: ${{ vars.DEPENDENCY_AUTOMATION_APP_CLIENT_ID }}
secrets:
  DEPENDENCY_AUTOMATION_APP_PRIVATE_KEY: ${{ secrets.DEPENDENCY_AUTOMATION_APP_PRIVATE_KEY }}
```

The old `token` secret remains as a temporary compatibility fallback while the
caller workflows migrate. After this reusable-workflow contract is on `master`,
update `.github/workflows/update_sdk_wrappers.yml` in `atomic-transact-ios` and
its maintained copy under `ios-sdk/Public/atomic-transact-ios`. Remove their
`SDK_WRAPPERS_TOKEN` mappings after both callers use the App credentials.

Security updates remain independent and do not run the fixer automatically. This
prevents an Expo recommendation from reverting a security remediation.

These commands reproduce the automation locally when diagnosing it:

```sh
yarn deps:expo:check
yarn deps:expo:update
```

The update command also keeps shared React, React Native, its Babel preset,
TypeScript, and React type versions aligned between the root and example
manifests. New Expo SDK pull requests can still require application or
native-code migration work, but their dependency and lockfile alignment is
handled by the same automation.

### Commit message convention

We follow the [conventional commits specification](https://www.conventionalcommits.org/en) for our commit messages:

- `fix`: bug fixes, e.g. fix crash due to deprecated method.
- `feat`: new features, e.g. add new method to the module.
- `refactor`: code refactor, e.g. migrate from class components to hooks.
- `docs`: changes into documentation, e.g. add usage example for the module..
- `test`: adding or updating tests, e.g. add integration tests using detox.
- `chore`: tooling changes, e.g. change CI config.

Our pre-commit hooks verify that your commit message matches this format when committing.

### Linting and tests

[ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/)

We use [TypeScript](https://www.typescriptlang.org/) for type checking, [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) for linting and formatting the code, and [Jest](https://jestjs.io/) for testing.

Our pre-commit hooks verify that the linter and tests pass when committing.

### Publishing to npm

Publishing is automated. Creating a GitHub Release on `master` triggers the [publish workflow](.github/workflows/publish.yml), which updates `package.json` to the release tag and publishes to npm via [trusted publishing](https://docs.npmjs.com/generating-provenance-statements#publishing-packages-with-provenance-via-github-actions).

See [`docs/RELEASE.md`](docs/RELEASE.md) for the full release flow and [`RELEASE_TEMPLATE.md`](RELEASE_TEMPLATE.md) for the release notes format.

### Scripts

The `package.json` file contains various scripts for common tasks:

- `yarn bootstrap`: setup project by installing all dependencies and pods.
- `yarn typecheck`: type-check files with TypeScript.
- `yarn lint`: lint files with ESLint.
- `yarn test`: run unit tests with Jest.
- `yarn deps:expo:check`: check the example app against Expo's current dependency recommendations.
- `yarn deps:expo:update`: update the example app to Expo's current compatible dependency versions.
- `yarn example start`: start the Metro server for the example app.
- `yarn example android`: run the example app on Android.
- `yarn example ios`: run the example app on iOS.

### Sending a pull request

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://app.egghead.io/playlists/how-to-contribute-to-an-open-source-project-on-github).

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that linters and tests are passing.
- Review the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.
- For pull requests that change the API or implementation, discuss with maintainers first by opening an issue.
