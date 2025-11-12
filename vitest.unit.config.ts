/// <reference types="vitest" />
// Vitest config for unit tests & coverage in the components package.
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
    include: ['components/src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: ['**/*.stories.*', '.storybook/**', '**/.storybook/**'],
    coverage: {
      provider: 'istanbul',
      include: ['components/src/**/*.{ts,tsx,js,jsx}', 'components/src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
      exclude: ['**/*.stories.*', '.storybook/**', '**/.storybook/**'],
      watermarks: {
        statements: [50, 80],
      },
    },
  },
});
