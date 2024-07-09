/**
 * 包装函数
 */
/**
 * promise 包装函数，返回一个 Promise<T>
 * @param fn 被包装额函数，可能为同步或异步
 */
export function promiseWrapper(fn: () => any) {
  return new Promise((resolve, reject) => {
    Promise.resolve()
      .then(fn)
      .then(res => resolve(res ?? true))
      .catch(e => reject(e))
  })
}
