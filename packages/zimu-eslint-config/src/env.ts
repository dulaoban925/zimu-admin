/**
 * 环境判断
 */
import process from 'node:process'
import { isPackageExists } from 'local-pkg'

// 是否在编辑器环境
export const isInEditor = !!(
  (process.env.VSCODE_PID ||
    process.env.VSCODE_CWD ||
    process.env.JETBRAINS_IDE ||
    process.env.VIM) &&
  !process.env.CI
)

// 是否包含 vue
export const hasVue = isPackageExists('vue') || isPackageExists('nuxt')
