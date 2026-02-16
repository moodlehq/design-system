import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig(
  [globalIgnores(['storybook-static/', 'dist/', 'coverage/'])],
  [
    {
      extends: fixupConfigRules(
        compat.extends(
          'eslint:recommended',
          'plugin:react/recommended',
          'plugin:@typescript-eslint/recommended',
          'plugin:@typescript-eslint/eslint-recommended',
          'prettier',
          'plugin:prettier/recommended',
          'plugin:react-hooks/recommended',
          'plugin:storybook/recommended',
        ),
      ),

      settings: {
        react: {
          version: 'detect',
        },
      },

      plugins: {
        '@typescript-eslint': fixupPluginRules(typescriptEslint),
      },

      languageOptions: {
        globals: {
          ...globals.jest,
          ...globals.browser,
        },

        parser: tsParser,
      },

      ignores: [
        'eslint.config.mjs',
        'vitest.config.js',
        '**/vendor/*.js',
        'CHANGELOG.md',
      ],

      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'prettier/prettier': [
          'error',
          {
            // This is a duplicate copy of the Prettier config in .github/linters/.prettierrc
            // but we need it here to ensure that ESLint applies the same formatting rules when using the --fix option.
            singleQuote: true,
            printWidth: 80,
            tabWidth: 2,
            plugins: ['prettier-plugin-organize-imports'],
          },
        ],
      },
    },
  ],
);
