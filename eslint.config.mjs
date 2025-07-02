import js from '@eslint/js';
import globals from 'globals';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';
import tsParser from '@typescript-eslint/parser';

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
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // React rules
      'react/react-in-jsx-scope': 'off',

      // Relax strict rules - convert to warnings or disable
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
    rules: {
      'no-undef': 'off', // TypeScript handles this
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
