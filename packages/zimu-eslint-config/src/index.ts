import type { Linter } from 'eslint'
import {
  prettierConfigs,
  sortConfigs,
  javascriptConfigs,
  typescriptConfigs,
  vueConfigs
} from './configs'
import { hasVue } from './env'

/**
 * preset 支持环境参数类型
 *
 * 目前支持 Vue、prettier
 *
 * TODO: markdown，yaml
 */
type EnvOptions = {
  vue: boolean,
  prettier: boolean
}

// 基础 config
const BasicConfigs = [...javascriptConfigs, ...typescriptConfigs, ...sortConfigs]

/**
 * eslint config 预置函数
 *
 * @param config 覆盖配置
 * @returns
 */
export function preset(config: Linter.Config | Linter.Config[], {
  vue: vueSupport = hasVue,
  prettier: prettierSupport = true
}: EnvOptions) {
  // 预置 eslint config 集合
  const configs: Linter.Config[] = BasicConfigs

  // 支持 Vue
  if (vueSupport) {
    configs.push(...vueConfigs)
  }

  // 支持 Prettier
  if (prettierSupport) {
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
