import path from 'path';
import type { StorybookConfig } from '@storybook/react-native-web-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {
      modulesToTranspile: [
        'nativewind',
        'react-native-css-interop',
        'react-native-reanimated',
        'react-native-gesture-handler',
        '@rn-primitives/slot',
        '@rn-primitives/checkbox',
        '@rn-primitives/dialog',
        '@rn-primitives/toast',
        '@rn-primitives/separator',
        '@rn-primitives/portal',
        '@rn-primitives/hooks',
        '@rn-primitives/types',
        'lucide-react-native',
        'react-native-svg',
      ],
      pluginReactOptions: {
        jsxImportSource: 'nativewind',
      },
    },
  },
  async viteFinal(config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...(config.resolve?.alias as Record<string, string> | undefined),
          // Force web versions of @rn-primitives packages that have them
          '@rn-primitives/checkbox': path.resolve(
            __dirname,
            '../src/web-overrides/checkbox.tsx'
          ),
          '@rn-primitives/dialog': path.resolve(
            __dirname,
            '../src/web-overrides/dialog.tsx'
          ),
          '@rn-primitives/separator': path.resolve(
            __dirname,
            '../src/web-overrides/separator.tsx'
          ),
        },
        extensions: [
          '.web.tsx',
          '.web.ts',
          '.web.mjs',
          '.web.js',
          '.tsx',
          '.ts',
          '.mjs',
          '.js',
          '.jsx',
          '.json',
          ...(config.resolve?.extensions ?? []),
        ],
      },
      optimizeDeps: {
        ...config.optimizeDeps,
        esbuildOptions: {
          ...config.optimizeDeps?.esbuildOptions,
          loader: {
            ...config.optimizeDeps?.esbuildOptions?.loader,
            '.mjs': 'jsx',
          },
        },
        include: [
          ...(config.optimizeDeps?.include ?? []),
          '@rn-primitives/portal',
          '@rn-primitives/toast',
          '@rn-primitives/hooks',
          '@rn-primitives/types',
        ],
      },
    };
  },
};

export default config;
