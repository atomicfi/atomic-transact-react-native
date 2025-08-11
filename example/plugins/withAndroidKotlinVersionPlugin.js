const { withProjectBuildGradle } = require('@expo/config-plugins');

module.exports = function withKotlinVersionProjectGradlePatch(config) {
  return withProjectBuildGradle(config, async (config) => {
    // Force kotlin gradle plugin classpath version to 2.1.21
    // Handles both single and double quotes, and both with/without an existing version

    const SINGLE_QUOTE_REGEX =
      /classpath\('org\.jetbrains\.kotlin:kotlin-gradle-plugin(?::[^']*)?'\)/g;
    const DOUBLE_QUOTE_REGEX =
      /classpath\("org\.jetbrains\.kotlin:kotlin-gradle-plugin(?::[^"]*)?"\)/g;

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
        '[kotlinVersionPatchCode] kotlin-gradle-plugin classpath pinned to 2.1.21'
      );
    }

    return config;
  });
};
