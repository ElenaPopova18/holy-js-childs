import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../child-apps/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: true,
      },
    },
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
    {
      name: '@storybook/addon-coverage',
      options: {
        include: ['**/child-apps/**'],
        exclude: ['**/*.stories.ts', '**/*.stories.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
        reportsDirectory: './coverage/storybook',
        reporter: ['lcov', 'text', 'html', 'json-summary'],
        enabled: true,
        check: {
          global: {
            statements: 0,
            lines: 0,
            branches: 0,
            functions: 0,
          },
        },
      },
    },
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    reactDocgen: false,
  },
  async viteFinal(storybookConfig) {
    return mergeConfig(storybookConfig, {
      define: {
        'process.env': {},
      },
      build: {
        sourcemap: true,
      },
      esbuild: {
        sourcemap: true,
      },
      test: {
        coverage: {
          provider: 'v8',
          reporter: ['lcov', 'text', 'html', 'json-summary'],
          reportsDirectory: './coverage/storybook',
          include: ['**/child-apps/**'],
          exclude: ['**/*.stories.ts', '**/*.stories.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
          all: true,
          enabled: true,
        },
      },
    });
  },
};

export default config;
