import { es2021, node } from 'globals';
import { configs } from '@eslint/js';
import { configs as _configs, parser as _parser, plugin } from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import standard from 'eslint-config-standard';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
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
