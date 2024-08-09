/**
 * eslint 导入配置
 */

import { PluginImport } from '../plugins'
import type { Linter } from 'eslint'

export const importConfigs: Linter.Config[] = [
  {
    name: 'zimu/import',
    plugins: {
      import: PluginImport as any
    }
  }
]
