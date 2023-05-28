import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// 当前程序执行的目录，即 build
const dir = dirname(fileURLToPath(import.meta.url))

// 根目录
export const pathRoot = resolve(dir, '..')
// vue 组件目录
export const pathComponents = resolve(pathRoot, 'vue')
// svg 资源目录
export const pathSvg = resolve(pathRoot, 'svg')
