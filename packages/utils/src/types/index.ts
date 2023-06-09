import { toTypeString } from '../general'

// 是否为 布尔型
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'

// 是否为 数组
export const isArray = Array.isArray

// 是否为 Map
export const isMap = (val: unknown): val is Map<any, any> =>
  toTypeString(val) === '[object Map]'

// 是否为 Set
export const isSet = (val: unknown): val is Set<any> =>
  toTypeString(val) === '[object Set]'

// 是否为 Date
export const isDate = (val: unknown): val is Date =>
  toTypeString(val) === '[object Date]'

// 是否为 正则
export const isRegExp = (val: unknown): val is RegExp =>
  toTypeString(val) === '[object RegExp]'

// 是否为 函数
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'

// 是否为 字符串
export const isString = (val: unknown): val is string => typeof val === 'string'

// 是否为 Symbol
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'

// 是否为 对象（可能包含数组、Map、Set 等）
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

// 是否为 Promise
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

// 是否为 纯对象
export const isPlainObject = (val: unknown): val is object =>
  toTypeString(val) === '[object Object]'

// 属性是否为 整型
export const isIntegerKey = (key: unknown) =>
  isString(key) &&
  key !== 'NaN' &&
  key[0] !== '-' &&
  '' + parseInt(key, 10) === key
