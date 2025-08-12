// Lightweight Expo config plugin to pin the Kotlin Gradle plugin version in android/build.gradle
// Usage in app.json/app.config: ["@atomicfi/transact-react-native/withAndroidKotlinVersionPlugin"]

const { withProjectBuildGradle } = require('@expo/config-plugins');

/**
 * Config plugin that ensures the Kotlin Gradle plugin classpath uses a specific version.
 * Currently pins to 2.1.21.
 *
 * @param {import('@expo/config-types').ExpoConfig} config
 */
function withKotlinVersionProjectGradlePatch(config) {
  return withProjectBuildGradle(config, (config) => {
    const SINGLE_QUOTE_REGEX =
      /classpath\('org\.jetbrains\.kotlin:kotlin-gradle-plugin(?:[^']*)?'\)/g;
    const DOUBLE_QUOTE_REGEX =
      /classpath\("org\.jetbrains\.kotlin:kotlin-gradle-plugin(?:[^"]*)?"\)/g;

    const before = config.modResults.contents;

    let after = before.replace(
      SINGLE_QUOTE_REGEX,
      "classpath('org.jetbrains.kotlin:kotlin-gradle-plugin:2.1.21')"
    );

    after = after.replace(
      DOUBLE_QUOTE_REGEX,
      'classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:2.1.21")'
    );

    if (after !== before) {
      config.modResults.contents = after;

      console.log(
        '[atomicfi/transact-react-native] kotlin-gradle-plugin classpath pinned to 2.1.21'
      );
    }

    return config;
  });
}

module.exports = withKotlinVersionProjectGradlePatch;
