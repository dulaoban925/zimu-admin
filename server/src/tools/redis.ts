import { get } from '@tools/env-config'
import { createClient, type RedisClientOptions } from 'redis'

/**
 * redis 客户端实例
 *
 * TODO: 完善类型
 */
let redisInstance: any

// 初始化 redis
export function initRedis() {
  const redis = getRedisInstance()

  redis.on('error', (err: any) => console.error('Redis Client Error:', err))
  redis.on('connect', () => console.log('Redis Client connected'))

  // 连接 redis
  redis.connect()
}

// 获取 redis 客户端实例，单例模式
export function getRedisInstance() {
  if (!redisInstance) {
    const redisConfig: RedisClientOptions = get('redis') as RedisClientOptions
    redisInstance = createClient(redisConfig)
  }
  return redisInstance
}
