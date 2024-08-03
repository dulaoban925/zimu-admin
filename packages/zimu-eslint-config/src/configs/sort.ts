/**
 * 排序类规则
 */
import type { Linter } from 'eslint'

// 导入语句排序配置
const importSortConfigs: Linter.Config[] = [
  {
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],

          pathGroups: [
            {
              pattern: 'vue',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@vue/**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@element-plus/**',
              group: 'internal',
            }],

          pathGroupsExcludedImportTypes: ['type'],
        }
      ],
    }
  }
]

// 排序类配置
export const sortConfigs = [
  ...importSortConfigs
]