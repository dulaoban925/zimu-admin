import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { emptyDir, ensureDir } from 'fs-extra'
import camelcase from 'camelcase'
import chalk from 'chalk'
import glob from 'fast-glob'
import { format } from 'prettier'
import { pathComponents, pathSvg } from './paths'
import type { BuiltInParserName } from 'prettier'

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
function formatCode(code: string, parser: BuiltInParserName = 'typescript') {
  return format(code, {
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
  const content = await readFile(file)
  const { fileName, componentName } = getName(file)

  const vue = formatCode(
    `<template> ${content} </template>
    <script lang="ts">
      import { defineComponent } from 'vue'
      export default defineComponent({
        name: '${componentName}'
      })
    </script>`,
    'vue'
  )

  writeFile(path.resolve(pathComponents, `${fileName}.vue`), vue, 'utf-8')
}

const generateEntry = async (files: string[]) => {
  const code = formatCode(
    files
      .map(file => {
        const { fileName, componentName } = getName(file)
        return `export { default as ${componentName} } from './${fileName}.vue'`
      })
      .join('\n')
  )
  await writeFile(path.resolve(pathComponents, 'index.ts'), code, 'utf-8')
}

function getSvgFiles() {
  return glob('*.svg', { cwd: pathSvg, absolute: true })
}

console.log(chalk.blue('generating vue components'))
await ensureDir(pathComponents)
await emptyDir(pathComponents)
const files = await getSvgFiles()

console.log(chalk.blue('generating vue files'))
await Promise.all(files.map((file: string) => transformToVueComponent(file)))

console.log(chalk.blue('generating entry file'))
await generateEntry(files)
