/**
 * 登录相关 api
 */
import { parse } from 'qs'
import { request } from '@/utils'
import { promiseWrapper } from '@/utils/wrapper'
import { useLocalStorage } from '@/hooks'
import { AUTH_KEY } from '@/constants'

// 登录
export async function login(data: { username: string; password: string }) {
  return promiseWrapper(async () => {
    const {
      data: { token }
    } = await request({
      url: `/login`,
      method: 'post',
      data
    })
    if (token) {
      const ls = useLocalStorage()
      ls.set(AUTH_KEY, token)
    }

    const href = window.location.href
    // url QueryString
    const queryString = href.split('?')[1]
    const parsedQueryParams = parse(queryString)
    // 重定向地址，默认系统主页
    let redirectUrl = href.split('#')[0]
    // 若 url 拼接 redirectUrl，重定向到 redirectUrl
    if (parsedQueryParams.redirectUrl)
      redirectUrl = parsedQueryParams.redirectUrl as string

    window.location.replace(redirectUrl)

    return token
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
