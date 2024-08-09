/**
 * eslint 注释 配置
 */
import { PluginComments } from '../plugins'
import type { Linter } from 'eslint'

export const commentConfigs: Linter.Config[] = [
  {
    name: 'zimu/comments',
    plugins: {
      'eslint-comments': PluginComments
    },
    rules: {
      ...PluginComments.configs.recommended.rules,
      'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }]
    }
  }
]
