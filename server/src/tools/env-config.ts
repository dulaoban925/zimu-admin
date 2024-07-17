import path from 'path'

// 定义 config 文件存储路径
process.env.NODE_CONFIG_DIR = path.resolve(__dirname, '../config')

const config = require('config')

/**
 * 获取指定 key 对应的环境变量
 * @param key
 * @returns
 */
export function get(key: string) {
  if (!has(key)) {
    console.warn(`指定 key: ${key} 未配置环境变量`)
    return null
  }
  return config.get(key)
}

/**
 * 判断指定 key 是否存在环境变量
 * @param key
 * @returns
 */
export function has(key: string) {
  return config.has(key)
}
