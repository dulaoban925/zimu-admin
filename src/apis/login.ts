/**
 * 登录相关 api
 */
import { request } from '@/utils'

// 登录
export function login(data: { username: string; password: string }) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 刷新 token
export function refreshToken() {
  return request({
    url: '/refreshToken',
    method: 'get'
  })
}

// 登出
export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}
