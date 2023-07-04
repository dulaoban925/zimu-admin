/**
 * 默认使用 Standard 规则
 * eslint-config-standard
 * https://github.com/standard/eslint-config-standard
 */
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/essential',
    'standard',
    'plugin:prettier/recommended',
    './.eslintrc-auto-import.json'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/multi-word-component-names': 0,
    'vue/no-v-model-argument': 0,
    'vue/no-multiple-template-root': 0,
    'no-void': 0
  },
  globals: {
    NodeJS: true
  }
}
