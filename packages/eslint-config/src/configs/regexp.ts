import { PluginRegexp } from '../plugins'
import type { Linter } from 'eslint'

export const regexpConfigs: Linter.Config[] = [
  {
    name: 'zimu/regexp',
    ...(PluginRegexp.configs['flat/recommended'] as Linter.Config)
  }
]
