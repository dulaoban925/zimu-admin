// T 或 空类型
export type Nullable<T> = T | null

// 获取 T 对象的值类型
export type ValueOf<T> = T[keyof T]

// 返回 Promise 类型的函数
export type WithPromise<T> = () => Promise<T>

// 懒加载
export type Lazy<T> = () => Promise<T>
