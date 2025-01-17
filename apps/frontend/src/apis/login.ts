/**
 * 登录相关 api
 */
import { parse } from 'qs'
import { AUTH_KEY } from '@/constants'
import { useLocalStorage } from '@/hooks'
import { useUserStore } from '@/store'
import { request } from '@/utils'
import { promiseWrapper } from '@/utils/wrapper'

// 登录
export function login(data: { username: string; password: string }) {
  return promiseWrapper(async () => {
    const {
      data: { token }
    } = await request.post('/login', {
      data
    })
    if (token) {
      const ls = useLocalStorage()
      ls.set(AUTH_KEY, token)
    }

    // 查询用户信息
    await useUserStore().getUserInfo(data.username)

    // 登录成功后重定向地址
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
  })()
}

// 刷新 token
export function refreshToken() {
  return request.get('/refreshToken')
}

// 登出
export function logout() {
  return promiseWrapper(async () => {
    await request.get('/logout')
    // 跳转登录
    const loginUrl = `${window.location.origin}/#/login`
    window.location.replace(loginUrl)
  })()
}
