import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import path from 'node:path';
import { defineConfig } from 'vitest/config';

const dirname = import.meta.dirname;

export default defineConfig({
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-dev-runtime'],
  },
  test: {
    coverage: {
      provider: 'istanbul',
      include: ['components/**/*.{ts,tsx,js,jsx}'],
      exclude: [
        '**/*.stories.*',
        '**/*.figma.*',
        '.storybook/**',
        '**/.storybook/**',
        'components/**/*.{test,spec}.{js,ts,jsx,tsx}',
      ],
      watermarks: {
        statements: [50, 80],
      },
      // Watermarks above only color the report; thresholds are what actually
      // fail the run, enforcing the documented 50% statement coverage minimum.
      thresholds: {
        statements: 50,
      },
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          globals: true,
          environment: 'jsdom',
          setupFiles: ['./tests/setupTests.ts'],
          include: ['components/**/*.{test,spec}.{js,ts,jsx,tsx}'],
        },
      },
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.resolve(dirname, '.storybook'),
            tags: {
              include: ['test'],
              exclude: ['experimental'],
            },
          }),
        ],
        test: {
          name: 'storybook',
          globals: true,
          environment: 'jsdom',
          setupFiles: [],
          exclude: ['components/**/*.{test,spec}.{js,ts,jsx,tsx}'],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
