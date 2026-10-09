import type { AddonOptionsVite } from '@storybook/addon-coverage';
import type { StorybookConfig } from '@storybook/react-vite';
import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

const componentsDir = path.resolve(import.meta.dirname, '../components');

// Component CSS ships as one global bundle, so Chromatic TurboSnap cannot link a
// `.css` change to the stories it affects. In Storybook only, make each
// component source file import its folder's CSS so the module graph carries
// that link. Appended (ES imports hoist) so source-map line numbers stay put.
const traceComponentCss = (): Plugin => ({
  name: 'mds-trace-component-css',
  enforce: 'pre',
  transform(code, id) {
    const file = id.split('?')[0];
    if (
      path.dirname(path.dirname(file)) !== componentsDir ||
      !/\.tsx?$/.test(file) ||
      /\.(stories|test|figma)\.tsx?$/.test(file)
    ) {
      return;
    }
    const cssImports = fs
      .readdirSync(path.dirname(file))
      .filter((name) => name.endsWith('.css'))
      .map((name) => `import './${name}';`);
    if (cssImports.length === 0) return;
    return { code: `${code}\n${cssImports.join('\n')}\n`, map: null };
  },
});

const coverageConfig: AddonOptionsVite = {
  istanbul: {
    include: ['../components/**'],
    exclude: ['../.storybook/**'],
  },
};

export default {
  stories: [
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../docs/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    'storybook-addon-pseudo-states',
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@storybook/addon-mcp',
    {
      name: '@storybook/addon-coverage',
      options: coverageConfig,
    },
    '@storybook/addon-themes',
    '@etchteam/storybook-addon-status',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // Serve story-only static assets (e.g. placeholder images) from .storybook/assets/.
  // Files here are available at the root URL path, e.g. /story-placeholder.svg.
  // Path is relative to the config directory (.storybook/).
  staticDirs: ['./assets'],
  viteFinal: (config) => ({
    ...config,
    plugins: [...(config.plugins ?? []), traceComponentCss()],
  }),
} as StorybookConfig;
