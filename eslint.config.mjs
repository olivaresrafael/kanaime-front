import astro from 'eslint-plugin-astro';
import * as astroParser from 'astro-eslint-parser';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.astro'],
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      astro,
    },
    rules: {
      ...astro.configs.recommended.rules,
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-empty': ['error', { allowEmptyCatch: true }],
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
      'no-undef': 'off',
      'no-empty': ['error', { allowEmptyCatch: true }],
    },
  },
];
