/* eslint-disable import/first */
// @ts-nocheck
/**
 * 插件集合
 */

export type Module<T> = T extends { default: infer U } ? U : T

// 获取模块
function getModule<T>(m: T): Module<T> {
  return (m as any).default || m
}

import * as _pluginAntfu from 'eslint-plugin-antfu'
export const PluginAntfu: typeof import('eslint-plugin-antfu').default =
  getModule(_pluginAntfu)

// 支持 typescript
import tsEslint from 'typescript-eslint'
export { tsEslint }

// node
import * as _pluginNode from 'eslint-plugin-n'
export const PluginNode: typeof import('eslint-plugin-n') =
  getModule(_pluginNode)

// regexp
import * as _pluginRegexp from 'eslint-plugin-regexp'
export const PluginRegexp: typeof import('eslint-plugin-regexp') =
  getModule(_pluginRegexp)

// 移除未使用的 import 引入
import * as _pluginUnusedImports from 'eslint-plugin-unused-imports'
export const PluginUnusedImports: any = getModule(_pluginUnusedImports)

// unicorn
import * as _pluginUnicorn from 'eslint-plugin-unicorn'
export const PluginUnicorn: any = getModule(_pluginUnicorn)

// prettier 插件
import _pluginPrettier from 'eslint-plugin-prettier'
export const PluginPrettier: any = getModule(_pluginPrettier)

// config prettier - 解决 eslint 与 prettier 冲突
import _configPrettier from 'eslint-config-prettier'
export const ConfigPrettier = getModule(_configPrettier)

// vue eslint 插件
import * as _pluginVue from 'eslint-plugin-vue'
export const PluginVue: any = getModule(_pluginVue)

// vue eslint 解析器，配合 eslint-plugin-vue 使用
export * as ParserVue from 'vue-eslint-parser'

// markdown
import * as _pluginMarkdown from 'eslint-plugin-markdown'
export const PluginMarkdown: any = getModule(_pluginMarkdown)

// json
export * as PluginJsonc from 'eslint-plugin-jsonc'
export * as ParserJsonc from 'jsonc-eslint-parser'

// gitignore
import * as _pluginIgnore from 'eslint-config-flat-gitignore'
export const PluginIgnore: any = getModule(_pluginIgnore)

// comments
import * as _pluginComments from 'eslint-plugin-eslint-comments'
export const PluginComments: any = getModule(_pluginComments)

// import
export * as PluginImport from 'eslint-plugin-import-x'

// sort
import * as _pluginPerfectionist from 'eslint-plugin-perfectionist'
export const PluginPerfectionist: any = getModule(_pluginPerfectionist)
