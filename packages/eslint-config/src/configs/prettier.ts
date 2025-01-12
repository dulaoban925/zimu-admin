import { ConfigPrettier, PluginPrettier } from '../plugins'
import type { Linter } from 'eslint'

const prettierConflictRules = { ...ConfigPrettier.rules }

// vue 规则全部放入 vue.ts 中维护
delete prettierConflictRules['vue/html-self-closing']

export const prettierConfigs: Linter.Config[] = [
  {
    name: 'zimu/prettier',
    plugins: {
      prettier: PluginPrettier
    },
    rules: {
      ...prettierConflictRules,
      ...PluginPrettier.configs.recommended.rules,
      'prettier/prettier': 'warn'
    }
  }
]
