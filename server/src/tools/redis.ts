import { createClient } from 'redis'

// redis 客户端实例
let redisInstance: any = null

// 初始化 redis
export function initRedis() {
  const redis = getRedisInstance()

  redis.on('error', (err: any) => console.log('Redis Client Error: ', err))
  redis.on('connect', () => console.log('Redis Client connected'))

  // 连接 redis
  redis.connect()
}

// 获取 redis 客户端实例，单例模式
export function getRedisInstance() {
  if (!redisInstance)
    redisInstance = createClient({
      url: 'redis://localhost:6379'
    })
  return redisInstance
}
