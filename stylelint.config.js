/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-html/html',
    'stylelint-config-html/svelte',
    'stylelint-config-standard-scss',
    '@stylistic/stylelint-config'
  ],
  rules: {
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'layer',
          'config',
          'variants',
          'responsive',
          'screen'
        ]
      }
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['theme']
      }
    ],
    'no-descending-specificity': null,
    'selector-class-pattern': null
  }
}
