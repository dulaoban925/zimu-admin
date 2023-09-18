import { SerializerType, Serializers } from './serializer'
import { STORAGE_VALUE_TYPE_KEY } from '@/constants'

type StorageType = 'localStorage' | 'sessionStorage'

// 将缓存的值类型添加到缓存中
export function addStorageValueTypeCache(
  key: string,
  type: SerializerType,
  storageType: StorageType = 'localStorage'
) {
  const storage = window[storageType]

  const { read, write } = Serializers.object
  const existValue: Record<string, SerializerType> = read(
    storage.getItem(STORAGE_VALUE_TYPE_KEY) ?? '{}'
  )
  existValue[key] = type

  storage.setItem(STORAGE_VALUE_TYPE_KEY, write(existValue))
}

// 将缓存的值类型添加到缓存中
export function removeStorageValueTypeCache(
  key: string,
  storageType: StorageType = 'localStorage'
) {
  const storage = window[storageType]

  const { read, write } = Serializers.object
  const existValue: Record<string, SerializerType> = read(
    storage.getItem(STORAGE_VALUE_TYPE_KEY) ?? '{}'
  )
  existValue[key] && delete existValue[key]

  storage.setItem(STORAGE_VALUE_TYPE_KEY, write(existValue))
}

// 清空缓存值类型的缓存
export function clearStorageValueTypeCache(
  storageType: StorageType = 'localStorage'
) {
  window[storageType].removeItem(STORAGE_VALUE_TYPE_KEY)
}

// 获取缓存值类型
export function getStorageValueType(
  key: string,
  storageType: StorageType = 'localStorage'
): SerializerType {
  const storage = window[storageType]

  const { read } = Serializers.object
  const existValue: Record<string, SerializerType> = read(
    storage.getItem(STORAGE_VALUE_TYPE_KEY) ?? '{}'
  )

  return existValue[key]
}
