import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

const isStorybook = process.env.VITEST_STORYBOOK === 'true';

export default defineConfig({
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-dev-runtime'],
  },
  plugins: isStorybook
    ? [
        storybookTest({
          configDir: path.resolve(dirname, '.storybook'),
          tags: {
            include: ['test'],
            exclude: ['experimental'],
          },
        }),
      ]
    : [],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: isStorybook
      ? ['.storybook/vitest.setup.ts']
      : ['./tests/setupTests.ts'],
    include: !isStorybook
      ? ['components/**/*.{test,spec}.{js,ts,jsx,tsx}']
      : undefined,
    exclude: isStorybook
      ? ['components/**/*.{test,spec}.{js,ts,jsx,tsx}']
      : ['**/*.stories.*', '.storybook/**', '**/.storybook/**'],
    browser: isStorybook
      ? {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{ browser: 'chromium' }],
        }
      : undefined,
    coverage: {
      provider: 'istanbul',
      include: !isStorybook ? ['components/**/*.{ts,tsx,js,jsx}'] : undefined,
      exclude: [
        '**/*.stories.*',
        '.storybook/**',
        '**/.storybook/**',
        'components/**/*.{test,spec}.{js,ts,jsx,tsx}',
      ],
      watermarks: !isStorybook
        ? {
            statements: [50, 80],
          }
        : undefined,
    },
  },
});
