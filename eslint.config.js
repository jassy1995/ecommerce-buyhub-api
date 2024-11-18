const { es2021, node } = require('globals');
const { configs } = require('@eslint/js');
const { configs: _configs, parser: _parser, plugin } = require('typescript-eslint');
const prettier = require('eslint-config-prettier');
const standard = require('eslint-config-standard');
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({ baseDirectory: __dirname });

module.exports = [
  ...compat.config(standard),
  configs.recommended,
  ..._configs.recommended,
  prettier,
  {
    languageOptions: {
      parser: _parser,
      ecmaVersion: 13,
      sourceType: 'module',
      globals: {
        ...es2021,
        ...node,
      },
    },
    plugins: {
      '@typescript-eslint': plugin,
    },
    rules: {
      'no-var': 'error',
      'no-multi-spaces': 'error',
      'space-in-parens': 'error',
      'no-multiple-empty-lines': 'error',
      'prefer-const': 'error',
      'space-before-function-paren': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      curly: 'error',
      '@typescript-eslint/no-var-requires': 'off',
    },
    ignores: ['.idea', 'gen', 'dist', 'node_modules'],
  },
];
