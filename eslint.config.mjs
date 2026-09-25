import js from '@eslint/js';
import globals from 'globals';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  // Global ignores
  {
    ignores: [
      'node_modules/',
      'lib/',
      'android/build/',
      'ios/build/',
      'example/android/build/',
      'example/ios/build/',
      '**/*.d.ts',
    ],
  },

  // Base ESLint configuration
  js.configs.recommended,

  // Base configuration for all files
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      prettier: pluginPrettier,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.commonjs,
        ...globals.es6,
        module: 'readonly',
        exports: 'readonly',
        require: 'readonly',
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'warn',
      'no-func-assign': 'off',
      'no-cond-assign': 'off',

      // Prettier rules
      'prettier/prettier': [
        'error',
        {
          quoteProps: 'consistent',
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'es5',
          useTabs: false,
        },
      ],
    },
  },

  // Configuration for generated files in lib/ directory
  {
    files: ['lib/**/*'],
    rules: {
      // Disable all problematic rules for generated files
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-func-assign': 'off',
      'no-cond-assign': 'off',
      'no-unused-expressions': 'off',
    },
  },

  // Configuration for TypeScript files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      'no-undef': 'off', // TypeScript handles this

      // The base rule reads a parameter name in a type or interface signature as an unused
      // variable -- `log(message: string): void` counts `message` as dead. Those names are
      // documentation, not bindings. The TypeScript-aware rule knows the difference and still
      // reports genuinely unused code; `_name` opts a real parameter out.
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },

  // Configuration for JavaScript and CommonJS files
  {
    files: ['*.js', '*.cjs', 'babel.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.commonjs,
      },
      sourceType: 'commonjs',
    },
    rules: {
      'no-undef': 'off',
    },
  },

  // Prettier config to disable conflicting rules
  configPrettier,
];
