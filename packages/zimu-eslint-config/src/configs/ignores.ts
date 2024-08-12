/**
 * eslint ignore 配置
 */
import { GLOB_IGNORE } from '../globs'
import { PluginIgnore } from '../plugins'
import type { Linter } from 'eslint'

export const ignoreConfigs: Linter.Config[] = [
  {
    ignores: GLOB_IGNORE,
    name: 'zimu/global-ignores'
  },
  {
    ...PluginIgnore({ strict: false }),
    name: 'zimu/gitignore'
  }
]
