/**
 * vue config
 */
import process from 'node:process'
import { getPackageInfoSync } from 'local-pkg'
import { GLOB_VUE } from '../glob-paths'
import { ParserVue, PluginVue, tsEslint } from '../plugins'
import { typescriptCoreConfigs } from './typescript'
import type { Linter } from 'eslint'

export function getVueVersion() {
  const pkg = getPackageInfoSync('vue', { paths: [process.cwd()] })
  if (
    pkg &&
    typeof pkg.version === 'string' &&
    !Number.isNaN(+pkg.version[0])
  ) {
    return +pkg.version[0]
  }
  return 3
}
const isVue3 = getVueVersion() === 3

export const reactivityTransform: Linter.Config[] = [
  {
    languageOptions: {
      globals: {
        $: 'readonly',
        $$: 'readonly',
        $computed: 'readonly',
        $customRef: 'readonly',
        $ref: 'readonly',
        $shallowRef: 'readonly',
        $toRef: 'readonly',
      },
    },
    plugins: {
      vue: PluginVue,
    },
    rules: {
      'vue/no-setup-props-reactivity-loss': 'off',
    },
  },
]

const vueCustomRules: Linter.RulesRecord = {
  'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
  'vue/custom-event-name-casing': ['error', 'camelCase'],
  'vue/eqeqeq': ['error', 'smart'],
  'vue/html-self-closing': [
    'error',
    {
      html: {
        component: 'always',
        normal: 'always',
        void: 'any',
      },
      math: 'always',
      svg: 'always',
    },
  ],
  'vue/max-attributes-per-line': 'off',

  'vue/multi-word-component-names': 'off',
  'vue/no-constant-condition': 'warn',
  'vue/no-empty-pattern': 'error',
  'vue/no-loss-of-precision': 'error',
  'vue/no-unused-refs': 'error',
  'vue/no-useless-v-bind': 'error',

  'vue/no-v-html': 'off',
  'vue/object-shorthand': [
    'error',
    'always',
    {
      avoidQuotes: true,
      ignoreConstructors: false,
    },
  ],
  'vue/one-component-per-file': 'off',
  'vue/padding-line-between-blocks': ['error', 'always'],
  'vue/prefer-template': 'error',
  'vue/require-default-prop': 'off',
  'vue/require-prop-types': 'off',
}

const vue3Rules: Linter.RulesRecord = {
  ...PluginVue.configs.base.rules,
  ...PluginVue.configs['vue3-essential'].rules,
  ...PluginVue.configs['vue3-strongly-recommended'].rules,
  ...PluginVue.configs['vue3-recommended'].rules,
}

const vue2Rules: Linter.RulesRecord = {
  ...PluginVue.configs.base.rules,
  ...PluginVue.configs.essential.rules,
  ...PluginVue.configs['strongly-recommended'].rules,
  ...PluginVue.configs.recommended.rules,
}

export const vueConfigs: Linter.Config[] = [
  ...(tsEslint.config({
    extends: typescriptCoreConfigs as any[],
    files: [GLOB_VUE],
  }) as any),
  {
    files: [GLOB_VUE],
    languageOptions: {
      parser: ParserVue,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: ['.vue'],
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
      vue: PluginVue,
    },
    processor: PluginVue.processors['.vue'],
    rules: {
      ...(isVue3 ? vue3Rules : vue2Rules),
      ...vueCustomRules,
    },
  },
  ...reactivityTransform,
]
