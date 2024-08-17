/**
 * eslint ignore 配置
 */
import { GLOB_IGNORE } from '../globs'
import { PluginIgnore } from '../plugins'
import type { Linter } from 'eslint'

export const ignoreConfigs: Linter.Config[] = [
  {
    name: 'zimu/ignores/global',
    ignores: GLOB_IGNORE
  },
  {
    ...PluginIgnore({ strict: false }),
    name: 'zimu/ignores/git'
  }
]
