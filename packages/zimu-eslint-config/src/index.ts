import {
  commentConfigs as comments,
  ignoreConfigs as ignores,
  importConfigs as imports,
  importSortConfigs as importSort,
  javascriptConfigs as javascript,
  nodeConfigs as node,
  prettierConfigs as prettier,
  regexpConfigs as regexp,
  typescriptConfigs as typescript,
  vueConfigs as vue
} from './configs'
import { hasVue } from './env'
import type { Linter } from 'eslint'

/**
 * preset 支持环境参数类型
 *
 * 目前支持 Vue、prettier
 *
 * TODO: markdown，yaml，json
 */
type EnvOptions = Partial<{
  vue: boolean
  prettier: boolean
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
  ...node,
  ...regexp
]

/**
 * 基础预置配置
 *
 * 包括：javascript、typescript、排序
 */
const presetBasicConfigs = [
  ...presetJavascriptConfigs,
  ...typescript,
  ...importSort
]

/**
 * eslint config 预置函数
 *
 * @param config 覆盖配置
 * @param evnOptions 环境配置项，可接受单个配置对象或多个配置数组
 * @returns
 */
export function preset(
  config: Linter.Config | Linter.Config[] = [],
  { vue: enableVue = hasVue, prettier: enablePrettier = true }: EnvOptions = {}
) {
  // 预置 eslint config 集合
  const configs: Linter.Config[] = presetBasicConfigs

  // 支持 Vue
  if (enableVue) {
    configs.push(...vue)
  }

  // 支持 Prettier
  if (enablePrettier) {
    configs.push(...prettier)
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
