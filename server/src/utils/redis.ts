/**
 * redis 工具类函数
 *
 * TODO: 待完善
 */
import { getRedisInstance } from '@tools/redis'

/** 字符串存储 start */
export function get(key: string) {
  return new Promise((resolve, reject) => {
    if (!key) return reject(new Error('Invalid key'))
    const redis = getRedisInstance()
    redis.get(key).then(resolve).catch(reject)
  })
}

export function set(key: string, value: any) {
  return new Promise((resolve, reject) => {
    if (!key) return reject(new Error('Invalid key'))
    if (value === null || value === undefined)
      return reject(new Error('Invalid value'))
    const redis = getRedisInstance()
    redis.set(key, value).then(resolve).catch(reject)
  })
}

export function del(key: string) {
  return new Promise((resolve, reject) => {
    if (!key) return reject(new Error('Invalid key'))
    const redis = getRedisInstance()
    redis.del(key).then(resolve).catch(reject)
  })
}
/** 字符串存储 end */

/** hash表存储 start */
export function hGet(key: string, field: string) {
  return new Promise((resolve, reject) => {
    if (!key) return reject(new Error('Invalid key'))
    if (!field) return reject(new Error('invalid field'))
    const redis = getRedisInstance()
    redis.hGet(key, field).then(resolve).catch(reject)
  })
}

export function hSet(key: string, value: Record<string, any>) {
  return new Promise((resolve, reject) => {
    if (!key) return reject(new Error('Invalid key'))
    if (value === null || value === undefined)
      return reject(new Error('Invalid value'))
    const redis = getRedisInstance()
    redis.hSet(key, value).then(resolve).catch(reject)
  })
}

export function hDel(key: string, field?: string) {
  return new Promise((resolve, reject) => {
    if (!key) return reject(new Error('Invalid key'))
    const redis = getRedisInstance()
    redis.hDel(key, field).then(resolve).catch(reject)
  })
}
/** hash表存储 end */

/** set 存储 start */
export function sAdd(key: string, value: any) {
  return new Promise((resolve, reject) => {
    if (!key) return reject(new Error('Invalid key'))
    if (value === null || value === undefined)
      return reject(new Error('Invalid value'))
    const redis = getRedisInstance()
    redis.sAdd(key, value).then(resolve).catch(reject)
  })
}

export function sMembers(key: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    if (!key) return reject(new Error('Invalid key'))
    const redis = getRedisInstance()
    redis.sMembers(key).then(resolve).catch(reject)
  })
}

export function sRem(key: string, value: any) {
  return new Promise((resolve, reject) => {
    if (!key) return reject(new Error('Invalid key'))
    if (value === null || value === undefined)
      return reject(new Error('Invalid value'))
    const redis = getRedisInstance()
    redis.sRem(key, value).then(resolve).catch(reject)
  })
}
/** set 表存储 end */
