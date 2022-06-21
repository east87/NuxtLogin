module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    "no-console": "off",
    "object-shorthand": 0,
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/first-attribute-linebreak': 'off',
    'vue/"object-literal-shorthand': 'off',

    'vue/"object-shorthand': 0,
    'vue/no-v-html': 0,
    'vue/no-useless-escape': 0,
    'vue/multi-word-component-names': 0,
    "vue/require-default-prop": 0,
    "vue/attribute-hyphenation": 0
  },
}
