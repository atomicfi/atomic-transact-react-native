# @atomicfi/transact-react-native [VERSION] **CUT AND PASTE ME IN THE TITLE OF THE RELEASE**

## [RELEASE_DATE]

### Changes

- [CHANGE_DESCRIPTION_1]
- [CHANGE_DESCRIPTION_2]
- [CHANGE_DESCRIPTION_3]

### Platform SDK Versions

- Android [[ANDROID_SDK_VERSION]](https://github.com/atomicfi/atomic-transact-android-public/releases/tag/v[ANDROID_SDK_VERSION])
- iOS [[IOS_SDK_VERSION]](https://github.com/atomicfi/atomic-transact-ios/releases/tag/[IOS_SDK_VERSION])

**Full Changelog**: https://github.com/atomicfi/atomic-transact-react-native/compare/[PREVIOUS_VERSION]...[VERSION]

---

## Template Usage Instructions

When creating a new release, replace the following placeholders:

- `[VERSION]` - The new version number (e.g., 3.12.2)
- `[RELEASE_DATE]` - Release date in YYYY-MM-DD format
- `[CHANGE_DESCRIPTION_X]` - Description of changes, features, or fixes
- `[ANDROID_SDK_VERSION]` - Version of the Android SDK (check android/build.gradle)
- `[IOS_SDK_VERSION]` - Version of the iOS SDK (check atomicfi-transact-react-native.podspec)
- `[PREVIOUS_VERSION]` - Previous version for changelog comparison

### Finding Platform SDK Versions

- **Android SDK Version**: Check `transact_version` in `android/build.gradle`
- **iOS SDK Version**: Check `AtomicSDK` dependency version in `atomicfi-transact-react-native.podspec`
