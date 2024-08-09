import {
  commentConfigs,
  ignoreConfigs,
  importConfigs,
  javascriptConfigs,
  prettierConfigs,
  sortConfigs,
  typescriptConfigs,
  vueConfigs
} from './configs'
import { hasVue } from './env'
import type { Linter } from 'eslint'

/**
 * preset 支持环境参数类型
 *
 * 目前支持 Vue、prettier
 *
 * TODO: markdown，yaml
 */
type EnvOptions = Partial<{
  vue: boolean
  prettier: boolean
}>

/**
 * JavaScript 预置配置
 *
 * 包括：ignores、comments、javascript、sort
 */
export const presetJavascriptConfigs = [
  ...ignoreConfigs,
  ...commentConfigs,
  ...javascriptConfigs,
  ...importConfigs
]

/**
 * 基础预置配置
 *
 * 包括：javascript、typescript、排序
 */
const presetBasicConfigs = [
  ...presetJavascriptConfigs,
  ...typescriptConfigs,
  ...sortConfigs
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
    configs.push(...vueConfigs)
  }

  // 支持 Prettier
  if (enablePrettier) {
    configs.push(...prettierConfigs)
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
