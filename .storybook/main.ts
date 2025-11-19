import type { AddonOptionsVite } from '@storybook/addon-coverage';
// @ts-ignore Suppressing type error until types are fixed in react-vite package.
import type { StorybookConfig } from '@storybook/react-vite';

const coverageConfig: AddonOptionsVite = {
  istanbul: {
    include: ['../components/src/**'],
    exclude: ['../.storybook/**'],
  },
};

export default {
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
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
} as StorybookConfig;
