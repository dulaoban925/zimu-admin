/**
 * 排序类规则
 */
import { PluginPerfectionist } from '../plugins'
import type { Linter } from 'eslint'

// 导入语句排序配置
export const importsSortConfigs: Linter.Config[] = [
  {
    name: 'zimu/sort/imports',
    plugins: {
      perfectionist: PluginPerfectionist
    },
    rules: {
      'perfectionist/sort-imports': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'internal-type',
            'parent',
            'parent-type',
            'sibling',
            'sibling-type',
            'index',
            'index-type',
            'object',
            'type',
            'side-effect',
            'side-effect-style'
          ],
          internalPattern: ['@/**', '~/**', '#**'],
          newlinesBetween: 'ignore'
        }
      ],
      'perfectionist/sort-named-exports': [
        'warn',
        { groupKind: 'values-first' }
      ],
      'perfectionist/sort-named-imports': [
        'warn',
        { groupKind: 'values-first' }
      ]
    }
  }
]
