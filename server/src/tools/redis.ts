import { get } from '@tools/env-config'
import { createClient } from 'redis'

// redis 客户端实例
let redisInstance: any = null

// 初始化 redis
export function initRedis() {
  const redis = getRedisInstance()

  redis.on('error', (err: any) => console.error('Redis Client Error:', err))
  redis.on('connect', () => console.success('Redis Client connected'))

  // 连接 redis
  redis.connect()
}

// 获取 redis 客户端实例，单例模式
export function getRedisInstance() {
  if (!redisInstance) {
    const redisConfig = get('redis')
    redisInstance = createClient(redisConfig)
  }
  return redisInstance
}
