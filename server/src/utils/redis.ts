/**
 * redis 工具类函数
 *
 * TODO: 待完善
 */
import { getRedisInstance } from '@tools/redis'

export function get(key: string) {
  return new Promise((resolve, reject) => {
    if (!key) return reject(new Error('Invalid key'))
    const redis = getRedisInstance()
    redis.get(key).then(resolve)
  })
}

export function set(key: string, value: any) {
  return new Promise((resolve, reject) => {
    if (!key) return reject(new Error('Invalid key'))
    if (value === null || value === undefined)
      return reject(new Error('Invalid value'))
    const redis = getRedisInstance()
    return redis.set(key, value)
  })
}

export function hGet(key: string, field: string) {
  return new Promise((resolve, reject) => {
    if (!key) return reject(new Error('Invalid key'))
    if (!field) return reject(new Error('invalid field'))
    const redis = getRedisInstance()
    redis.hGet(key, field).then(resolve)
  })
}

export function hSet(key: string, value: Record<string, any>) {
  return new Promise((resolve, reject) => {
    if (!key) return reject(new Error('Invalid key'))
    if (value === null || value === undefined)
      return reject(new Error('Invalid value'))
    const redis = getRedisInstance()
    redis.hSet(key, value).then(resolve)
  })
}
