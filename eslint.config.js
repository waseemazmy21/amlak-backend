import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: { '@typescript-eslint': typescriptEslint },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
    },
  },
  {
    languageOptions: {
      globals: { node: true },
    },
  },
];
