// @ts-check

/**
 * Use recommended, recommended-type-checked, and strict plus best practice rules.
 */

const tsEslint = require('typescript-eslint')
const eslint = require('@eslint/js')
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')
const reactRecommended = require('eslint-plugin-react/configs/recommended')
const eslintPluginReactHooks = require('eslint-plugin-react-hooks')

module.exports = tsEslint.config({
  files: ['**/*.ts', '**/*.tsx'],
  extends: [
    eslint.configs.recommended,
    reactRecommended,
    ...tsEslint.configs.strictTypeChecked,
    ...tsEslint.configs.stylisticTypeChecked,
    eslintPluginPrettierRecommended,
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: {
    'react-hooks': eslintPluginReactHooks.configs.recommended,
  },
  rules: {
    ...eslintPluginReactHooks.configs.recommended.rules,
    'react/react-in-jsx-scope': 'off',
  },
})