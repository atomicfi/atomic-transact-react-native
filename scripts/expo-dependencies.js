const { spawnSync } = require('node:child_process');
const { readFileSync, writeFileSync } = require('node:fs');
const { join } = require('node:path');

const ROOT_DIRECTORY = join(__dirname, '..');
const ROOT_PACKAGE_PATH = join(ROOT_DIRECTORY, 'package.json');
const EXAMPLE_PACKAGE_PATH = join(ROOT_DIRECTORY, 'example', 'package.json');

const SHARED_DEPENDENCIES = [
  {
    name: 'react',
    rootSection: 'devDependencies',
    exampleSection: 'dependencies',
  },
  {
    name: 'react-native',
    rootSection: 'devDependencies',
    exampleSection: 'dependencies',
  },
  {
    name: '@react-native/babel-preset',
    exampleName: 'react-native',
    rootSection: 'devDependencies',
    exampleSection: 'dependencies',
  },
  {
    name: '@types/react',
    rootSection: 'devDependencies',
    exampleSection: 'devDependencies',
  },
  {
    name: 'typescript',
    rootSection: 'devDependencies',
    exampleSection: 'devDependencies',
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

function sharedDependencyState(rootPackage, examplePackage) {
  return SHARED_DEPENDENCIES.map((dependency) => {
    const exampleName = dependency.exampleName ?? dependency.name;
    const rootSpecifier =
      rootPackage[dependency.rootSection]?.[dependency.name];
    const exampleSpecifier =
      examplePackage[dependency.exampleSection]?.[exampleName];

    if (!rootSpecifier || !exampleSpecifier) {
      throw new Error(
        `${dependency.name} must exist in the root and ${exampleName} must exist in the example manifest`
      );
    }

    return {
      ...dependency,
      rootSpecifier,
      exampleSpecifier,
      rootVersion: dependencyVersion(
        rootSpecifier,
        dependency.name,
        'package.json'
      ),
      exampleVersion: dependencyVersion(
        exampleSpecifier,
        exampleName,
        'example/package.json'
      ),
    };
  });
}

function checkSharedDependencies(rootPackage, examplePackage) {
  const mismatches = sharedDependencyState(rootPackage, examplePackage).filter(
    ({ rootVersion, exampleVersion }) => rootVersion !== exampleVersion
  );

  if (mismatches.length > 0) {
    const details = mismatches
      .map(
        ({ name, rootSpecifier, exampleSpecifier }) =>
          `  - ${name}: root ${rootSpecifier}, example ${exampleSpecifier}`
      )
      .join('\n');

    throw new Error(`Shared Expo dependencies are not aligned:\n${details}`);
  }

  console.log('Shared root and example dependencies are aligned');
}

function syncSharedDependencies(rootPackage, examplePackage) {
  const updates = [];

  for (const dependency of sharedDependencyState(rootPackage, examplePackage)) {
    if (dependency.rootVersion === dependency.exampleVersion) {
      continue;
    }

    const rangePrefix = dependency.rootSpecifier.match(/^[~^]/)?.[0] ?? '';
    rootPackage[dependency.rootSection][dependency.name] =
      `${rangePrefix}${dependency.exampleVersion}`;
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
    runYarn(['workspace', 'example', 'expo', 'install', '--check']);
    checkSharedDependencies(
      readPackage(ROOT_PACKAGE_PATH),
      readPackage(EXAMPLE_PACKAGE_PATH)
    );
    return;
  }

  if (mode === 'fix') {
    runYarn(['workspace', 'example', 'expo', 'install', '--fix']);

    const rootPackage = readPackage(ROOT_PACKAGE_PATH);
    const examplePackage = readPackage(EXAMPLE_PACKAGE_PATH);
    syncSharedDependencies(rootPackage, examplePackage);

    // This command intentionally updates the root manifest, so CI's default
    // immutable install mode must be disabled while regenerating the lockfile.
    runYarn(['install', '--no-immutable']);
    checkSharedDependencies(
      readPackage(ROOT_PACKAGE_PATH),
      readPackage(EXAMPLE_PACKAGE_PATH)
    );
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
