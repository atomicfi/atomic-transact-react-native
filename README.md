# @atomicfi/transact-react-native

React Native bridge for the Transact SDK

See our [documentation](https://docs.atomicfi.com/reference/transact-sdk#libraries__react-native) for additional information.

## Release Instructions

This repository uses automated publishing via GitHub releases. When you publish a release, it automatically:

1. ✅ Updates `package.json` version to match the release tag
2. ✅ Commits the version change back to the repository
3. ✅ Publishes the package to npm with the correct version

### Creating a Release

1. **Ensure your code is ready for release** on the `master` branch

2. **Create a new release** on GitHub:
   - Go to [Releases](../../releases) → "Create a new release"
   - Use the [release template](RELEASE_TEMPLATE.md) for the release notes

3. **Publish the release** - This automatically triggers the publish workflow

### Version Guidelines

- Use [semantic versioning](https://semver.org/): `MAJOR.MINOR.PATCH`
- Tag format: `1.2.3`
- For testing: Use pre-release tags like `1.2.3-beta.1`

### What Happens Automatically

When you publish a release:

```
GitHub Release (1.2.3) → Workflow Triggers → Updates package.json → Commits Changes → Publishes to npm
```

### Manual Publishing (Fallback)

If needed, you can manually trigger the publish workflow:

1. Go to [Actions](../../actions) → "publish" workflow
2. Click "Run workflow" → Select branch → "Run workflow"
3. Note: Manual triggers skip version updates

### Troubleshooting

- **Workflow fails**: Check the [Actions](../../actions) tab for detailed logs
- **Version conflicts**: Ensure the release tag doesn't already exist on npm
- **Permission issues**: Verify npm token is properly configured in repository secrets
