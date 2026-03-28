const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');
const uiKitRoot = path.resolve(monorepoRoot, 'packages/ui-kit/src');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [monorepoRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];
config.resolver.disableHierarchicalLookup = true;

// Resolve ~/lib/utils etc. in ui-kit package to packages/ui-kit/src/
const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // When importing from ui-kit source files, resolve ~/ to ui-kit/src/
  if (
    moduleName.startsWith('~/') &&
    context.originModulePath.includes('packages/ui-kit/src/')
  ) {
    const resolved = path.resolve(uiKitRoot, moduleName.slice(2));
    return context.resolveRequest(context, resolved, platform);
  }

  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: './global.css' });
