const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Find the project and workspace directories
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// 1. Watch the workspace root for changes
config.watchFolders = [workspaceRoot];

// 2. Let Metro know where to resolve packages from
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPath`
config.resolver.disableHierarchicalLookup = true;

// 4. Add the workspace packages to the nodeModulesPaths
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 5. Configure resolver to find workspace packages
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

module.exports = config;
