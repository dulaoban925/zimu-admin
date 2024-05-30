import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// 目录相对路径
export const dirsRelativePath = {
  root: '..',
  src: 'src',
  components: 'components',
  svg: 'svg',
  output: 'dist'
}

// 当前程序执行的目录，即 build
const dir = dirname(fileURLToPath(import.meta.url))

// 根目录
export const pathRoot = resolve(dir, dirsRelativePath.root)
// src 目录
export const pathSrc = resolve(pathRoot, dirsRelativePath.src)
// vue 组件目录
export const pathComponents = resolve(pathSrc, dirsRelativePath.components)
// svg 资源目录
export const pathSvg = resolve(pathSrc, dirsRelativePath.svg)
// 编译输出目录
export const pathOutput = resolve(pathRoot, dirsRelativePath.output)
