module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order'],
  customSyntax: 'postcss-less',
  plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties'],
  rules: {
    'function-no-unknown': null,
    'no-descending-specificity': null,
    'plugin/declaration-block-no-ignored-properties': true,
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['/^g2-/', 'sf', '/^nz-/', '/^app-/', '/^layout-default-/', 'nu-monaco-editor', 'nu-monaco-diff-editor']
      }
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['ng-deep']
      }
    ],
    'import-notation': 'string',
    'media-feature-range-notation': 'prefix',
    'media-query-no-invalid': null,
    'selector-class-pattern': [
      '^[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)?(--[a-z0-9]([-]?[a-z0-9]+)*)?$',
      {
        /** This option will resolve nested selectors with & interpolation. - https://stylelint.io/user-guide/rules/selector-class-pattern/#resolvenestedselectors-true--false-default-false */
        resolveNestedSelectors: true,
        /** Custom message */
        message: function expected(selectorValue) {
          return `Expected class selector "${selectorValue}" to match BEM CSS pattern https://en.bem.info/methodology/css. Selector validation tool: https://regexr.com/3apms`;
        }
      }
    ],
    'no-duplicate-selectors': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind']
      }
    ],
  },
  ignoreFiles: ['src/assets/**/*']
};
