/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// Automatically discover one entry per component directory so new components
// are included in the build without any manual configuration changes.
const componentEntries = Object.fromEntries(
  fs
    .readdirSync(path.join(dirname, 'components'), { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => [
      `components/${d.name}/index`,
      `./components/${d.name}/index.tsx`,
    ]),
);

export default defineConfig({
  plugins: [
    react(),
    dts({
      // Exclude dev-only files from the generated type declarations, matching tsconfig.json.
      exclude: ['**/*.stories.tsx', '**/*.test.tsx', '**/*.figma.tsx'],
    }),
  ],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  build: {
    lib: {
      // Multiple entry points: one for the full package, one per component subpath.
      // Each key becomes the output file path under dist/ (e.g. dist/components/button/index.js).
      entry: {
        index: './index.ts',
        ...componentEntries,
      },
      name: 'moodle-design-system',
      fileName: (_, entryName) => `${entryName}.js`, // Preserve entry path as output filename.
      formats: ['es'], // Specifies the output format (ES modules only).
    },
    cssCodeSplit: false, // bundle all CSS into a single file
    rollupOptions: {
      external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime'],
      output: {
        assetFileNames: 'index.css', // name the CSS file
        // Transpile every source file into its own output file with a stable, predictable
        // path — no chunk splitting, no content hashes. This matches Moodle's loading model
        // where files are served directly by URL without a consumer-side build step.
        preserveModules: true,
        preserveModulesRoot: '.',
        entryFileNames: '[name].js',
      },
    },
    sourcemap: true, // Generates source maps for debugging.
    emptyOutDir: true, // Clears the output directory before building.
    minify: false, // Disable minification for JS/CSS/assets
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
