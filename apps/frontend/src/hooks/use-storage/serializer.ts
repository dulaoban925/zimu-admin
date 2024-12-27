import {
  addStorageValueTypeCache,
  getStorageValueType
} from './storage-value-type'

export type SerializerType =
  | 'boolean'
  | 'object'
  | 'number'
  | 'any'
  | 'string'
  | 'map'
  | 'set'
  | 'date'

interface Serializer<T> {
  read: (raw: string) => T
  write: (value: T) => string
}

export const Serializers: Record<SerializerType, Serializer<any>> = {
  boolean: {
    read: (v: any) => v === 'true',
    write: (v: any) => String(v)
  },
  object: {
    read: (v: any) => JSON.parse(v),
    write: (v: any) => JSON.stringify(v)
  },
  number: {
    read: (v: any) => Number.parseFloat(v),
    write: (v: any) => String(v)
  },
  any: {
    read: (v: any) => v,
    write: (v: any) => String(v)
  },
  string: {
    read: (v: any) => v,
    write: (v: any) => String(v)
  },
  map: {
    read: (v: any) => new Map(JSON.parse(v)),
    write: (v: any) =>
      JSON.stringify(Array.from((v as Map<any, any>).entries()))
  },
  set: {
    read: (v: any) => new Set(JSON.parse(v)),
    write: (v: any) => JSON.stringify(Array.from(v as Set<any>))
  },
  date: {
    read: (v: any) => new Date(v),
    write: (v: any) => v.toISOString()
  }
}

export function guessSerializerType<
  T extends string | number | boolean | object | null
>(raw: T) {
  return raw == null
    ? 'any'
    : raw instanceof Set
      ? 'set'
      : raw instanceof Map
        ? 'map'
        : raw instanceof Date
          ? 'date'
          : typeof raw === 'boolean'
            ? 'boolean'
            : typeof raw === 'string'
              ? 'string'
              : typeof raw === 'object'
                ? 'object'
                : !Number.isNaN(raw)
                  ? 'number'
                  : 'any'
}

// 获取序列化程序
export function getSerializer(k: string, v?: any, cache?: boolean) {
  const vType: SerializerType = v
    ? (getStorageValueType(k) ?? guessSerializerType(toValue(v)) ?? 'any')
    : (getStorageValueType(k) ?? 'any')

  // 缓存 k-vType
  cache && addStorageValueTypeCache(k, vType)

  return Serializers[vType]
}
