import { isString } from '../types'

// 空函数
export const NOOP = () => {}

// 总是返回 false 的函数
export const NO = () => false

export const extend = Object.assign

// 移除数组中的元素
export const remove = <T>(arr: T[], el: T) => {
  const i = arr.indexOf(el)
  if (i > -1) {
    arr.splice(i, 1)
  }
}

//  key 是否为 val 对象的属性
const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (
  val: object,
  key: string | symbol
): key is keyof typeof val => hasOwnProperty.call(val, key)

export const objectToString = Object.prototype.toString
export const toTypeString = (value: unknown): string =>
  objectToString.call(value)

// 获取 value 的数据类型
export const toRawType = (value: unknown): string => {
  // extract "RawType" from strings like "[object RawType]"
  return toTypeString(value).slice(8, -1)
}

// 缓存字符串相关函数的处理结果，若 camelize、capitalize
const cacheStringFunction = <T extends (str: string) => string>(fn: T): T => {
  const cache: Record<string, string> = Object.create(null)
  return ((str: string) => {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }) as T
}

// 短横线连接转驼峰
const camelizeRE = /-(\w)/g
export const camelize = cacheStringFunction((str: string): string => {
  return str.replaceAll(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
})

// 首字母大写
export const capitalize = cacheStringFunction(
  (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
)

// 比较变量是否变更，若变更则返回 true（NaN 除外）
export const hasChanged = (value: any, oldValue: any): boolean =>
  !Object.is(value, oldValue)

/**
 * 转数字，仅保留数字部分
 * "123-foo" will be parsed to 123
 */
export const looseToNumber = (val: any): any => {
  const n = Number.parseFloat(val)
  return Number.isNaN(n) ? val : n
}

/**
 * 转数字，仅用于数字型的字符串，如 ‘123’
 * "123-foo" will be returned as-is
 */
export const toNumber = (val: any): any => {
  const n = isString(val) ? Number(val) : Number.NaN
  return Number.isNaN(n) ? val : n
}
