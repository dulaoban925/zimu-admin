import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// 目录相对路径
export const dirsRelativePath = {
  root: '..',
  src: 'src',
  output: 'dist'
}

// 当前程序执行的目录，即 build
const dir = dirname(fileURLToPath(import.meta.url))

// 根目录
export const pathRoot = resolve(dir, dirsRelativePath.root)
// src 目录
export const pathSrc = resolve(pathRoot, dirsRelativePath.src)
// 编译输出目录
export const pathOutput = resolve(pathRoot, dirsRelativePath.output)
