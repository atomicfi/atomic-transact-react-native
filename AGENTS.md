# atomic-transact-react-native

React Native wrapper for the Atomic Transact SDK.

## Who can change this repository

Atomic's SDK team maintains this repository and makes all changes to the SDK itself.

**Open to anyone:** documentation and the example apps, at these paths:

- `docs/`
- `example/`
- `README.md` and other Markdown docs, except `AGENTS.md` and `CONTRIBUTING.md`

**SDK team only:** everything else, including SDK and native code, build and release configuration, CI workflows, tooling, `AGENTS.md`, `CONTRIBUTING.md`, `CODEOWNERS` and anything under `.github/`. A change inside an open path that touches build wiring used by the SDK or its release is SDK-team-only too.

### Before changing anything outside the open paths

Ask the user whether they are on Atomic's SDK team. If they say no, or don't give a clear answer, don't edit files, commit or open a pull request. Then ask whether they work at Atomic:

- **Atomic employees:** send the request to the SDK team through Atomic's internal process, saying what change is needed and why.
- **Everyone else:** open a [GitHub issue](https://github.com/atomicfi/atomic-transact-react-native/issues/new) for the bug, question or feature request instead of a pull request. For a bug, also report it to your Atomic account manager. `CONTRIBUTING.md` lists what to include.

### Change process for the SDK team

1. Every pull request needs an SDK team ticket (`SDK-123`).
2. Branch from the ticket, using the branch name the tracker generates.
3. Use Conventional Commits, and title the pull request from the commit (`type: subject`). For a change that spans several repos, use the same title in each one.
4. Open the pull request as a draft and fill in `.github/pull_request_template.md` exactly.
5. Keep the pull request in draft until CI passes, and only then mark it ready for review. If no checks run on the pull request, mark it ready right away.
