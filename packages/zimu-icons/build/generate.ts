import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import camelcase from 'camelcase'
import chalk from 'chalk'
import consola from 'consola'
import glob from 'fast-glob'
import { emptyDir, ensureDir } from 'fs-extra'
import { format, type BuiltInParserName } from 'prettier'
import { pathComponents, pathSvg } from './paths'

/**
 * 从文件路径中获取文件名及组件名
 * @param file 文件路径
 * @returns
 */
function getName(file: string) {
  const fileName = path.basename(file).replace('.svg', '')
  const componentName = camelcase(fileName, { pascalCase: true })
  return {
    fileName,
    componentName
  }
}

/**
 * 按照给定解析器格式化代码
 * @param code 待格式化代码
 * @param parser 解析器类型
 * @returns 格式化后的代码
 */
async function formatCode(
  code: string,
  parser: BuiltInParserName = 'typescript'
) {
  return await format(code, {
    parser,
    semi: false,
    trailingComma: 'none',
    singleQuote: true
  })
}

/**
 * 将 file 转换为 vue 组件
 * @param file 待转换的 file 路径
 */
async function transformToVueComponent(file: string) {
  const content = await readFile(file, 'utf-8')
  const { fileName, componentName } = getName(file)

  const vue = await formatCode(
    `<template> ${content} </template>
    <script lang="ts" setup>
      defineOptions({
        name: '${componentName}',
      })
      </script>`,
    'vue'
  )

  writeFile(path.resolve(pathComponents, `${fileName}.vue`), vue, 'utf-8')
}

/**
 * 生成 components 入口文件
 */
const generateEntry = async (files: string[]) => {
  const elePlusIconsExport = `export * from '@element-plus/icons-vue'`
  const code = await formatCode(
    [
      ...files.map(file => {
        const { fileName, componentName } = getName(file)
        return `export { default as ${componentName} } from './${fileName}.vue'`
      }),
      elePlusIconsExport
    ].join('\n')
  )
  await writeFile(path.resolve(pathComponents, 'index.ts'), code, 'utf-8')
}

/**
 * 获取 svg 文件
 */
function getSvgFiles() {
  return glob('*.svg', { cwd: pathSvg, absolute: true })
}

consola.log(chalk.blue('开始生成 Vue 图标组件................................'))
await ensureDir(pathComponents)
await emptyDir(pathComponents)
const files = await getSvgFiles()

consola.log(chalk.blue('开始生成 Vue 文件................................'))
await Promise.all(files.map((file: string) => transformToVueComponent(file)))

consola.log(
  chalk.blue('开始生成 Vue 组件入口文件................................')
)
await generateEntry(files)
consola.log(chalk.green('Vue 图标组件已生成'))
