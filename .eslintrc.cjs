/** @type { import("eslint").Linter.FlatConfig } */
module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2022,
    extraFileExtensions: ['.svelte']
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:n/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:promise/recommended',
    'plugin:svelte/recommended',
    'standard'
  ],
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  settings: {
    'import/resolver': {
      node: true,
      typescript: true
    }
  }
}
