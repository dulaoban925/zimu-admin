/**
 * eslint 导入配置
 */

import { GLOB_MARKDOWN, GLOB_SRC, GLOB_SRC_EXT } from '../globs'
import { PluginAntfu, PluginImport } from '../plugins'
import type { Linter } from 'eslint'

export const importConfigs: Linter.Config[] = [
  {
    name: 'zimu/imports',
    plugins: {
      antfu: PluginAntfu,
      import: PluginImport as any
    },
    rules: {
      'antfu/import-dedupe': 'error',
      'import/first': 'error',
      'import/no-default-export': 'error',
      'import/no-duplicates': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-named-default': 'error',
      'import/no-self-import': 'error',
      'import/no-webpack-loader-syntax': 'error'
    }
  },
  {
    name: 'zimu/imports/allow-default-export',
    files: [
      `**/*config*.${GLOB_SRC_EXT}`,
      `**/{views,pages,router,store,routes,middleware,plugins,api}/${GLOB_SRC}`,
      `**/{index,vite,esbuild,rollup,rolldown,webpack,rspack}.ts`,
      '**/*.d.ts',
      `${GLOB_MARKDOWN}/**`,
      '**/.prettierrc*'
    ],
    plugins: {
      import: PluginImport as any
    },
    rules: {
      'import/no-default-export': 'off'
    }
  }
]
