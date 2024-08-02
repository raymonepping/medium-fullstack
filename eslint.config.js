const { defineConfig } = require('eslint-define-config');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = defineConfig({
  env: {
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  plugins: [
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
    'no-undef': 'error',
    'no-console': 'off',  // Allow console statements, adjust as needed
  },
});
