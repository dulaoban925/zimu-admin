/**
 * 包装函数
 */
/**
 * promise 包装函数，返回一个 Promise<T>
 * @param fn 被包装额函数，可能为同步或异步
 */
export function promiseWrapper(fn: (...args: any) => any, context?: any) {
  return function (...args: any) {
    return new Promise((resolve, reject) => {
      tryCatchWrapper(
        fn,
        context
      )(...args)
        .then(resolve)
        .catch(reject)
    })
  }
}

/**
 * try ... catch ... 包装器
 */
export function tryCatchWrapper(fn: (...args: any) => any, context?: any) {
  return function (...args: any) {
    return new Promise((resolve, reject) => {
      try {
        const result = context ? fn.apply(context, ...args) : fn(...args)
        if (result instanceof Promise) {
          result.then(resolve).catch(reject)
        } else {
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    })
  }
}
