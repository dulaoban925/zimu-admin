// T 或 空类型
export type Nullable<T> = T | null

// T 或 never
export type WithNever<T> = T | never

// 获取 T 对象的值类型
export type ValueOf<T> = T[keyof T]

// 懒加载
export type Lazy<T> = () => Promise<T>
