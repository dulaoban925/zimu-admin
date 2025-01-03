import {
  commentConfigs as comments,
  ignoreConfigs as ignores,
  importConfigs as imports,
  importsSortConfigs as importsSort,
  javascriptConfigs as javascript,
  jsonConfigs as json,
  markdownConfigs as markdown,
  nodeConfigs as node,
  packageJsonSortConfigs as packageJsonSort,
  prettierConfigs as prettier,
  regexpConfigs as regexp,
  tsconfigSortConfigs as tsconfigSort,
  typescriptConfigs as typescript,
  unicornConfigs as unicorn,
  vueConfigs as vue
} from './configs'
import { hasVue } from './env'
import type { FlatConfigs } from './types'
import type { Linter } from 'eslint'

/**
 * preset 支持环境参数类型
 *
 * 目前支持 Vue、prettier
 *
 * TODO: yaml、react、unocss、tailwindcss...
 */
type EnvOptions = Partial<{
  vue: boolean
  prettier: boolean
  markdown: boolean
}>

/**
 * JavaScript 预置配置
 *
 * 包括：ignores、comments、javascript、import、node、regexp
 */
export const presetJavascriptConfigs = [
  ...ignores,
  ...comments,
  ...javascript,
  ...imports,
  ...importsSort,
  ...unicorn,
  ...node,
  ...regexp
]

// JSON 配置
export const presetJsonConfigs = [...json, ...packageJsonSort, ...tsconfigSort]

/**
 * 语言扩展
 *
 * 包括：markdown, json
 */
export const presetExtensionConfigs = [...markdown, ...presetJsonConfigs]

/**
 * 基础预置配置
 *
 * 包括：javascript、typescript、json
 */
const presetBasicConfigs = [
  ...presetJavascriptConfigs,
  ...typescript,
  ...presetJsonConfigs
]

/**
 * eslint config 预置函数
 *
 * @param config 覆盖配置
 * @param evnOptions 环境配置项，可接受单个配置对象或多个配置数组
 * @returns
 */
export function preset(
  config: FlatConfigs | FlatConfigs[] = {},
  {
    vue: enableVue = hasVue,
    prettier: enablePrettier = true,
    markdown: enableMarkdown = true
  }: EnvOptions = {}
) {
  // 预置 eslint config 集合
  const configs: Linter.Config[] = presetBasicConfigs

  // 启用 Vue
  if (enableVue) {
    configs.push(...vue)
  }

  // 启用 Prettier
  if (enablePrettier) {
    configs.push(...prettier)
  }

  // 启用 markdown
  if (enableMarkdown) {
    configs.push(...markdown)
  }

  // 合并自定义配置
  const hasConfig = Array.isArray(config)
    ? config.length > 0
    : Object.keys(config).length > 0
  if (hasConfig) {
    configs.push(...(Array.isArray(config) ? config : [config]))
  }

  return configs
}
