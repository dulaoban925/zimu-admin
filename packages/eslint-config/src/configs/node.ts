import { PluginNode } from '../plugins'
import type { Linter } from 'eslint'

export const nodeConfigs: Linter.Config[] = [
  {
    name: 'zimu/node',
    plugins: {
      node: PluginNode
    },
    rules: {
      'node/handle-callback-err': ['error', '^(err|error)$'],
      'node/no-deprecated-api': 'error',
      'node/no-exports-assign': 'error',
      'node/no-new-require': 'error',
      'node/no-path-concat': 'error',
      'node/no-unsupported-features/es-builtins': 'error',
      'node/prefer-global/buffer': ['error', 'never'],
      'node/prefer-global/process': ['error', 'never'],
      'node/process-exit-as-throw': 'error'
    }
  }
]
