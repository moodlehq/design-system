/// <reference types="vitest" />
// Vitest config for Storybook interaction & accessibility tests in the components package.
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-dev-runtime', 'react-bootstrap'],
  },
  test: {
    include: ['**/*.stories.*', '.storybook/**', '**/.storybook/**'],
    exclude: ['components/src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    projects: [
      {
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
            tags: {
              include: ['test'],
              exclude: ['experimental'],
            },
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
