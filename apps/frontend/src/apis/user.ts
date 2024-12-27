/**
 * 用户相关接口
 */
import { request } from '@/utils'

// 获取用户权限资源列表
export async function getUserAuth(username: string) {
  const result = await request({
    url: '/user/auth',
    method: 'get',
    query: {
      username
    }
  })

  return result.data
}

// 获取用户信息
export async function getUserInfo(username: string) {
  const result = await request({
    url: '/user/me',
    method: 'get',
    query: {
      username
    }
  })

  return result.data
}
