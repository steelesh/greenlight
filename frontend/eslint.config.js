/**
 * ESLint configuration
 * Based on Anthony Fu's (@antfu) preset configuration
 * With additional rules inspired by CJ's (@w3cj) ESLint configuration
 * @see https://github.com/antfu/eslint-config
 * @see https://gist.github.com/w3cj/21b1f1b4857ecd13d076075a5c5aaf13
 */

import antfu from '@antfu/eslint-config'

export default antfu({
  svelte: true,
  typescript: true,
  formatters: true,
  stylistic: {
    indent: 2,
    semi: true,
    quotes: 'double',
  },
  ignores: ['.pnpm-store/*'],
}, {
  rules: {
    'ts/no-redeclare': 'off',
    'ts/consistent-type-definitions': ['error', 'type'],
    'no-console': ['warn'],
    'antfu/no-top-level-await': ['off'],
    'node/prefer-global/process': ['off'],
    'node/no-process-env': ['error'],
    'perfectionist/sort-imports': ['error', {
      tsconfigRootDir: '.',
    }],
    'unicorn/filename-case': ['error', {
      case: 'kebabCase',
      ignore: ['README.md'],
    }],
  },
})
