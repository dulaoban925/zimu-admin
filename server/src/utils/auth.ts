import { CURRENT_USER, TOKEN_BLACK_LIST } from '@constants/redis-keys'
import { JWT_SECRET } from '@constants/secrets'
import { UserService } from '@services/user.service'
import { get as getConfig } from '@tools/env-config'
import { getRedisInstance } from '@tools/redis'
import jwt from 'jsonwebtoken'
import { del, get, sAdd, sMembers } from './redis'
import type { Action } from 'routing-controllers'

/**
 * 接口授权验证逻辑
 */
export async function authChecker(action: Action) {
  // 请求头 Authorization 获取 token
  const token = action.request.headers.authorization?.split(' ')[1]
  // 若 token 不存在，不通过
  if (!token) return false

  try {
    // 1.jwt 验证 token 是否有效
    const payload = jwt.verify(token, JWT_SECRET)
    // 2.验证用户名是否有效
    const username = (payload as jwt.JwtPayload).username
    if (!username) return false
    // 3.若不存在对应用户，不通过
    const user = await new UserService().queryByUsername(username)
    if (!user) return false
    // 4.验证 token 是否在黑名单中
    const tokenBlackList = await getTokenBlackList()
    const inBlackList = tokenBlackList.includes(token)
    if (inBlackList) return false

    return true
  } catch {
    return false
  }
}

/**
 * redis 获取当前用户账号
 * @returns
 */
export function getCurrentUserFromRedis() {
  return get(CURRENT_USER)
}

/**
 * token 获取当前用户账号
 * @returns
 */
export function getCurrentUserFromToken(token: string) {
  try {
    // jwt 验证 token 是否有效
    const payload = jwt.verify(token, JWT_SECRET)

    // 验证用户名是否有效
    const username = (payload as jwt.JwtPayload).username
    return username
  } catch {
    return null
  }
}

export function clearCurrentUser() {
  return del(CURRENT_USER)
}

/**
 * 获取 token 黑名单
 */
export async function getTokenBlackList() {
  return (await sMembers(TOKEN_BLACK_LIST)) ?? []
}

/**
 * 将 token 加入黑名单
 */
export async function addTokenToBlackList(token: string) {
  await sAdd(TOKEN_BLACK_LIST, token)
  // 设置黑名单的过期时间，与 token 过期时间一致
  // 配置的 token 时间，单位为秒
  const tokenExpire = getConfig('tokenExpire') as number
  const redisClient = getRedisInstance()
  redisClient.expire(TOKEN_BLACK_LIST, tokenExpire)
  return
}
