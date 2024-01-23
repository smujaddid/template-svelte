/* eslint-disable n/no-extraneous-import */
import globals from 'globals'
import js from '@eslint/js'
import StylisticPlugin from '@stylistic/eslint-plugin'

// @ts-expect-error missing type
import nodePlugin from 'eslint-plugin-n'
// @ts-expect-error missing type
import * as importPlugin from 'eslint-plugin-import'
// @ts-expect-error missing type
import promisePlugin from 'eslint-plugin-promise'
import standard from 'eslint-config-standard'

import sveltePlugin from 'eslint-plugin-svelte'
import svelteParser from 'svelte-eslint-parser'

const jsExtensions = ['.js', '.cjs', '.mjs', '.jsx']
const typeScriptExtensions = ['.ts', '.cts', '.mts', '.tsx']
const allExtensions = [...typeScriptExtensions, ...jsExtensions]

const nodePluginConfigFlatRecommended = nodePlugin.configs['flat/recommended']

/** @type { import("eslint").Linter.FlatConfig } */
export default [
  {
    ignores: [
      '**/.vscode',
      '**/dist',
      '**/node_modules',
      '**/package.json',
      '**/package-lock.json',
      '**/public'
    ]
  },
  {
    files: ['**/*.{js,cjs,mjs,ts,svelte}']
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        ...nodePluginConfigFlatRecommended.languageOptions.globals,
        // @ts-expect-error @types/eslint seems to be incomplete
        document: 'readonly',
        // @ts-expect-error @types/eslint seems to be incomplete
        navigator: 'readonly',
        // @ts-expect-error @types/eslint seems to be incomplete
        window: 'readonly'
      },
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      import: importPlugin,
      n: nodePlugin,
      promise: promisePlugin,
      '@stylistic': StylisticPlugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,
      ...nodePluginConfigFlatRecommended.rules,
      // ...promisePlugin.configs.recommended.rules,
      ...standard.rules,
      ...StylisticPlugin.configs['disable-legacy'].rules,
      ...StylisticPlugin.configs['recommended-flat'].rules
    },
    settings: {
      'import/extensions': allExtensions,
      'import/external-module-folders': ['node_modules', 'node_modules/@types'],
      'import/parsers': {
        espree: ['.js', '.cjs', '.mjs', '.jsx'],
        '@typescript-eslint/parser': typeScriptExtensions
      },
      'import/resolver': {
        node: {
          extensions: allExtensions
        },
        typescript: true
      }
    }
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        extraFileExtensions: ['.svelte']
      }
    },
    processor: sveltePlugin.processors.svelte,
    plugins: {
      svelte: sveltePlugin
    },
    rules: {
      ...sveltePlugin.configs.recommended.rules
    }
  },
  {
    // Override rules
    rules: {
      '@stylistic/arrow-parens': 0,
      '@stylistic/brace-style': [2, '1tbs'],
      '@stylistic/comma-dangle': [2, 'only-multiline'],
      '@stylistic/quote-props': [2, 'as-needed'],
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
  }
]
