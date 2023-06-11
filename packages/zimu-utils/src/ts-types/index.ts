// T 或 空类型
export type Nullable<T> = T | null

// 获取 T 对象的值类型
export type ValueOf<T> = T[keyof T]
