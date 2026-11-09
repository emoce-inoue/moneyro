const js = require('@eslint/js');
const prettierRecommended = require('eslint-plugin-prettier/recommended');
const globals = require('globals');

module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**'],
  },
  js.configs.recommended,
  prettierRecommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
      eqeqeq: ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      curly: ['error', 'all'],
      quotes: ['error', 'single', { avoidEscape: true }],
      'prettier/prettier': ['error', { singleQuote: true, printWidth: 360 }],
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-const': ['error', { destructuring: 'all', ignoreReadBeforeAssign: true }],
      'no-var': 'error',
      'object-shorthand': ['error', 'always'],
      'no-debugger': 'error',
    },
  },
];
