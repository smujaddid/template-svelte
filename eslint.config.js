/* eslint-disable n/no-extraneous-import */
import globals from 'globals'
import js from '@eslint/js'

// @ts-expect-error missing type
import nodePlugin from 'eslint-plugin-n'
// @ts-expect-error missing type
import importPlugin from 'eslint-plugin-import'
// @ts-expect-error missing type
import promisePlugin from 'eslint-plugin-promise'
import standard from 'eslint-config-standard'

// import typescriptPlugin from '@typescript-eslint/eslint-plugin'
// import typescriptParser from '@typescript-eslint/parser'

import sveltePlugin from 'eslint-plugin-svelte'
import svelteParser from 'svelte-eslint-parser'

const jsExtensions = ['.js', '.cjs', '.mjs', '.jsx']
const typeScriptExtensions = ['.ts', '.cts', '.mts', '.tsx']
const allExtensions = [...typeScriptExtensions, ...jsExtensions]

/** @type { import("eslint").Linter.FlatConfig } */
export default [
  {
    ignores: ['public/**']
  },
  {
    files: ['**/*.{js,cjs,mjs,ts,svelte}']
  },
  js.configs.recommended,
  nodePlugin.configs['flat/recommended'],
  {
    plugins: {
      promise: promisePlugin
    },
    rules: {
      ...promisePlugin.configs.recommended.rules
    }
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
      }
    },
    plugins: {
      import: importPlugin
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules
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
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true }
      },
      globals: {
        ...globals.es2021,
        ...globals.node,
        // @ts-expect-error @types/eslint seems to be incomplete
        document: 'readonly',
        // @ts-expect-error @types/eslint seems to be incomplete
        navigator: 'readonly',
        // @ts-expect-error @types/eslint seems to be incomplete
        window: 'readonly'
      }
    },
    rules: {
      ...standard.rules
    }
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node
      }
    },
    rules: {
      // allow paren-less arrow functions
      'arrow-parens': 0,
      // allow async-await
      'generator-star-spacing': 0,
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
  }
]
