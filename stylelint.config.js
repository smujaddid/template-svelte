/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-html/html',
    'stylelint-config-html/svelte',
    'stylelint-config-standard-scss'
  ],
  customSyntax: 'postcss-html',
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
    'no-descending-specificity': null
  }
}
