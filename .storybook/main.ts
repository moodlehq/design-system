import type { AddonOptionsVite } from '@storybook/addon-coverage';
import type { StorybookConfig } from '@storybook/react-vite';

const coverageConfig: AddonOptionsVite = {
  istanbul: {
    include: ['../components/**'],
    exclude: ['../.storybook/**'],
  },
};

export default {
  stories: ['../components/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-designs',
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    {
      name: '@storybook/addon-coverage',
      options: coverageConfig,
    },
    '@storybook/addon-themes',
    '@storybook/addon-mcp',
  ],
  features: {
    experimentalComponentsManifest: true, // Enable manifest generation for the docs toolset, only supported in React-based setups.
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
} as StorybookConfig;
