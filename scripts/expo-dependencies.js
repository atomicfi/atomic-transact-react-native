const { spawnSync } = require('node:child_process');
const { readFileSync, writeFileSync } = require('node:fs');
const { join } = require('node:path');

const ROOT_DIRECTORY = join(__dirname, '..');
const ROOT_PACKAGE_PATH = join(ROOT_DIRECTORY, 'package.json');
// Every Expo app workspace must stay on the Expo SDK cohort. The example app
// is the source of truth for the root's shared development dependencies.
const APP_WORKSPACES = [
  { name: 'example', manifest: 'example/package.json' },
  {
    name: 'TransactAppiumTestEnvironment',
    manifest: 'appium-test-environment/package.json',
  },
];
const [EXAMPLE_WORKSPACE] = APP_WORKSPACES;

const SHARED_DEPENDENCIES = [
  {
    name: 'react',
    rootSection: 'devDependencies',
    appSection: 'dependencies',
  },
  {
    name: 'react-native',
    rootSection: 'devDependencies',
    appSection: 'dependencies',
  },
  {
    name: '@react-native/babel-preset',
    appName: 'react-native',
    rootSection: 'devDependencies',
    appSection: 'dependencies',
  },
  {
    name: '@types/react',
    rootSection: 'devDependencies',
    appSection: 'devDependencies',
  },
  {
    name: 'typescript',
    rootSection: 'devDependencies',
    appSection: 'devDependencies',
  },
];

function readPackage(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function dependencyVersion(specifier, dependency, manifest) {
  const match = specifier.match(/^[~^]?(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)$/);

  if (!match) {
    throw new Error(
      `Cannot compare ${dependency} in ${manifest}: unsupported version specifier ${specifier}`
    );
  }

  return match[1];
}

function sharedDependencyState(rootPackage, workspace, appPackage) {
  return SHARED_DEPENDENCIES.map((dependency) => {
    const appName = dependency.appName ?? dependency.name;
    const rootSpecifier =
      rootPackage[dependency.rootSection]?.[dependency.name];
    const appSpecifier = appPackage[dependency.appSection]?.[appName];

    if (!rootSpecifier || !appSpecifier) {
      throw new Error(
        `${dependency.name} must exist in the root and ${appName} must exist in ${workspace.manifest}`
      );
    }

    return {
      ...dependency,
      rootSpecifier,
      appSpecifier,
      rootVersion: dependencyVersion(
        rootSpecifier,
        dependency.name,
        'package.json'
      ),
      appVersion: dependencyVersion(appSpecifier, appName, workspace.manifest),
    };
  });
}

function checkSharedDependencies(rootPackage) {
  const mismatches = APP_WORKSPACES.flatMap((workspace) =>
    sharedDependencyState(
      rootPackage,
      workspace,
      readPackage(join(ROOT_DIRECTORY, workspace.manifest))
    )
      .filter(({ rootVersion, appVersion }) => rootVersion !== appVersion)
      .map((dependency) => ({ ...dependency, workspace }))
  );

  if (mismatches.length > 0) {
    const details = mismatches
      .map(
        ({ name, rootSpecifier, appSpecifier, workspace }) =>
          `  - ${name}: root ${rootSpecifier}, ${workspace.manifest} ${appSpecifier}`
      )
      .join('\n');

    throw new Error(`Shared Expo dependencies are not aligned:\n${details}`);
  }

  console.log('Shared root and app workspace dependencies are aligned');
}

function syncSharedDependencies(rootPackage, examplePackage) {
  const updates = [];

  for (const dependency of sharedDependencyState(
    rootPackage,
    EXAMPLE_WORKSPACE,
    examplePackage
  )) {
    if (dependency.rootVersion === dependency.appVersion) {
      continue;
    }

    const rangePrefix = dependency.rootSpecifier.match(/^[~^]/)?.[0] ?? '';
    rootPackage[dependency.rootSection][dependency.name] =
      `${rangePrefix}${dependency.appVersion}`;
    updates.push(dependency.name);
  }

  if (updates.length > 0) {
    writeFileSync(
      ROOT_PACKAGE_PATH,
      `${JSON.stringify(rootPackage, null, 2)}\n`,
      'utf8'
    );
    console.log(`Aligned shared dependencies: ${updates.join(', ')}`);
  }
}

function runYarn(arguments_) {
  const command = process.platform === 'win32' ? 'yarn.cmd' : 'yarn';
  const result = spawnSync(command, arguments_, {
    cwd: ROOT_DIRECTORY,
    stdio: 'inherit',
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function main() {
  const mode = process.argv[2];

  if (mode === 'check') {
    for (const workspace of APP_WORKSPACES) {
      runYarn(['workspace', workspace.name, 'expo', 'install', '--check']);
    }
    checkSharedDependencies(readPackage(ROOT_PACKAGE_PATH));
    return;
  }

  if (mode === 'fix') {
    for (const workspace of APP_WORKSPACES) {
      runYarn(['workspace', workspace.name, 'expo', 'install', '--fix']);
    }

    const rootPackage = readPackage(ROOT_PACKAGE_PATH);
    const examplePackage = readPackage(
      join(ROOT_DIRECTORY, EXAMPLE_WORKSPACE.manifest)
    );
    syncSharedDependencies(rootPackage, examplePackage);

    // This command intentionally updates the root manifest, so CI's default
    // immutable install mode must be disabled while regenerating the lockfile.
    runYarn(['install', '--no-immutable']);
    checkSharedDependencies(readPackage(ROOT_PACKAGE_PATH));
    return;
  }

  throw new Error('Usage: node scripts/expo-dependencies.js <check|fix>');
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
