import type { AddonOptionsWebpack } from '@storybook/addon-coverage';
import type { StorybookConfig } from '@storybook/react-vite';

const coverageConfig: AddonOptionsWebpack = {
  istanbul: {
    include: ['../components/src/**'],
    exclude: ['../.storybook/**'],
  },
};

const config: StorybookConfig = {
  stories: ['../components/src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    {
      name: '@storybook/addon-coverage',
      options: coverageConfig,
    },
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  }
};
export default config;
