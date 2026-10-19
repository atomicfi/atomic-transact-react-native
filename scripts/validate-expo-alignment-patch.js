const { spawnSync } = require('node:child_process');
const { readFileSync } = require('node:fs');
const { join, resolve } = require('node:path');
const { isDeepStrictEqual } = require('node:util');

const APP_DIRECTORIES = ['example', 'appium-test-environment'];
const ALLOWED_FILES = new Set([
  'package.json',
  ...APP_DIRECTORIES.flatMap((directory) => [
    `${directory}/package.json`,
    `${directory}/app.json`,
  ]),
  'yarn.lock',
]);
const ROOT_DEPENDENCIES = new Set([
  '@react-native/babel-preset',
  'react',
  'react-native',
  '@types/react',
  'typescript',
]);
const APP_DEPENDENCIES = new Set([
  '@react-native-async-storage/async-storage',
  '@types/react',
  'eslint-config-expo',
  'react',
  'react-native',
  'react-native-safe-area-context',
  'react-native-screens',
  'typescript',
]);
const SHARED_DEPENDENCIES = [
  ['react', 'devDependencies', 'dependencies'],
  ['react-native', 'devDependencies', 'dependencies'],
  [
    '@react-native/babel-preset',
    'devDependencies',
    'dependencies',
    'react-native',
  ],
  ['@types/react', 'devDependencies', 'devDependencies'],
  ['typescript', 'devDependencies', 'devDependencies'],
];
const CONFIG_PLUGIN_DEPENDENCIES = new Set([
  'expo-build-properties',
  'expo-dev-client',
  'expo-font',
  'expo-status-bar',
  'expo-updates',
]);
const VERSION = /^[~^]?\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;

function fail(message) {
  throw new Error(message);
}

function git(directory, ...arguments_) {
  const result = spawnSync('git', ['-C', directory, ...arguments_], {
    encoding: 'utf8',
  });

  if (result.error) throw result.error;
  if (result.status !== 0) {
    fail(result.stderr.trim() || `git ${arguments_.join(' ')} failed`);
  }

  return result.stdout;
}

function stagedFiles(directory) {
  const lines = git(
    directory,
    'diff',
    '--cached',
    '--name-status',
    '--no-renames',
    'HEAD',
    '--'
  )
    .trim()
    .split('\n')
    .filter(Boolean);

  if (lines.length === 0) fail('No staged changes to validate');

  return new Set(
    lines.map((line) => {
      const [status, file] = line.split('\t');

      if (status !== 'M' || !ALLOWED_FILES.has(file)) {
        fail(`Disallowed staged change: ${line}`);
      }

      return file;
    })
  );
}

function readJson(directory, file, original = false) {
  const text = original
    ? git(directory, 'show', `HEAD:${file}`)
    : readFileSync(join(directory, file), 'utf8');

  try {
    return JSON.parse(text);
  } catch (error) {
    fail(`${file} is not valid JSON: ${error.message}`);
  }
}

function isExpoDependency(name) {
  return (
    name === 'expo' ||
    name.startsWith('expo-') ||
    name.startsWith('@expo/') ||
    APP_DEPENDENCIES.has(name)
  );
}

function validateManifest(file, before, after, allowed) {
  const expected = JSON.parse(JSON.stringify(before));

  for (const section of ['dependencies', 'devDependencies']) {
    for (const [name, next] of Object.entries(after[section] || {})) {
      const previous = before[section]?.[name];
      if (previous === next) continue;

      if (
        !allowed(section, name) ||
        typeof previous !== 'string' ||
        typeof next !== 'string' ||
        !VERSION.test(previous) ||
        !VERSION.test(next)
      ) {
        fail(`${file} contains a disallowed change at ${section}.${name}`);
      }

      expected[section][name] = next;
    }
  }

  if (!isDeepStrictEqual(expected, after)) {
    fail(`${file} contains changes outside allowed dependency versions`);
  }
}

function validateAppConfig(file, before, after, appPackage) {
  if (JSON.stringify(before) === JSON.stringify(after)) return;

  const oldPlugins = before.expo?.plugins;
  const newPlugins = after.expo?.plugins;

  if (!Array.isArray(oldPlugins) || !Array.isArray(newPlugins)) {
    fail(`${file} may only add Expo plugins`);
  }

  const additions = newPlugins.slice(oldPlugins.length);
  const declared = {
    ...appPackage.dependencies,
    ...appPackage.devDependencies,
  };
  const seen = new Set(
    oldPlugins.map((plugin) => (Array.isArray(plugin) ? plugin[0] : plugin))
  );

  if (additions.length === 0) {
    fail(`${file} contains unsafe Expo plugin changes`);
  }

  for (const plugin of additions) {
    if (
      typeof plugin !== 'string' ||
      !CONFIG_PLUGIN_DEPENDENCIES.has(plugin) ||
      !Object.hasOwn(declared, plugin) ||
      seen.has(plugin)
    ) {
      fail(`${file} contains unsafe Expo plugin changes`);
    }

    seen.add(plugin);
  }

  const expected = JSON.parse(JSON.stringify(before));
  expected.expo.plugins = [...oldPlugins, ...additions];
  if (!isDeepStrictEqual(expected, after)) {
    fail(`${file} contains changes outside Expo plugin additions`);
  }
}

function dependencyVersion(specifier, name) {
  if (typeof specifier !== 'string' || !VERSION.test(specifier)) {
    fail(`${name} has unsupported version ${specifier}`);
  }

  return specifier.replace(/^[~^]/, '');
}

function validateSharedDependencies(rootPackage, file, appPackage) {
  for (const [
    name,
    rootSection,
    appSection,
    appName = name,
  ] of SHARED_DEPENDENCIES) {
    const rootSpecifier = rootPackage[rootSection]?.[name];
    const appSpecifier = appPackage[appSection]?.[appName];

    if (
      dependencyVersion(rootSpecifier, name) !==
      dependencyVersion(appSpecifier, name)
    ) {
      fail(
        `${name} is not aligned: root ${rootSpecifier}, ${file} ${appSpecifier}`
      );
    }
  }
}

function validateLockfile(directory, staged) {
  if (!staged.has('yarn.lock')) return;

  const lockfile = readFileSync(join(directory, 'yarn.lock'), 'utf8');
  if (
    !lockfile.startsWith(
      '# This file is generated by running "yarn install"'
    ) ||
    !lockfile.includes('\n__metadata:\n')
  ) {
    fail('yarn.lock does not look like a Yarn lockfile');
  }
}

function main() {
  if (process.argv.length !== 3) {
    fail('Usage: node scripts/validate-expo-alignment-patch.js <checkout>');
  }

  const directory = resolve(process.argv[2]);
  const staged = stagedFiles(directory);
  const rootBefore = readJson(directory, 'package.json', true);
  const rootAfter = readJson(directory, 'package.json');

  validateManifest(
    'package.json',
    rootBefore,
    rootAfter,
    (section, name) =>
      section === 'devDependencies' && ROOT_DEPENDENCIES.has(name)
  );

  for (const appDirectory of APP_DIRECTORIES) {
    const manifest = `${appDirectory}/package.json`;
    const appConfig = `${appDirectory}/app.json`;
    const packageAfter = readJson(directory, manifest);

    validateManifest(
      manifest,
      readJson(directory, manifest, true),
      packageAfter,
      (_section, name) => isExpoDependency(name)
    );
    validateAppConfig(
      appConfig,
      readJson(directory, appConfig, true),
      readJson(directory, appConfig),
      packageAfter
    );
    validateSharedDependencies(rootAfter, manifest, packageAfter);
  }

  validateLockfile(directory, staged);

  console.log(`Validated Expo alignment changes: ${[...staged].join(', ')}`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
