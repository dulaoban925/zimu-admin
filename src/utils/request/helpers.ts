import { isFunction } from '..'
import { useLocalStorage } from '@/hooks'
import { AUTH_KEY } from '@/constants'

/**
 * 类似 Function.prototype.bind，修改执行上下文指向
 * 此函数涵盖参数处理
 * @param fn 函数
 * @param context 执行上下文
 */
function bind(fn: Function, context: any) {
  return function () {
    return fn.apply(context, [...arguments])
  }
}

/**
 * 将 source 对象的属性及属性值添加到 target 上，若属性设计函数，则执行上下文指向 context
 * @param target 目标对象
 * @param source 来源对象
 * @param context 执行上下文
 */
export function extend(target: any, source: any, context?: any) {
  if (!source) return target
  for (const key in source) {
    const value = source[key]
    // 是否为函数属性
    const isFnProp = context && isFunction(value)
    target[key] = isFnProp ? bind(value, context) : value
  }
  return target
}

/**
 * 移除权限相关缓存
 */
export function removeAuthorization() {
  const ls = useLocalStorage()
  ls.remove(AUTH_KEY)
}

/**
 * 登录
 * 1. TODO: 刷新 token
 * 2. 1 失败后跳转登录页
 */
export function reLogin() {
  const loginUrl = `${window.location.origin}/#/login?redirectUrl=${window.location.href}`
  window.location.replace(loginUrl)
  window.location.reload()
}
