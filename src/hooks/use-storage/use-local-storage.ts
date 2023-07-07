/**
 * localStorage hook
 */
import { encrypt, decrypt } from '@/utils'
import { getSerializer } from './serializer'

/**
 *
 * @param needEncrypt 是否需要加密，AES 加密算法
 * @returns
 */
export function useLocalStorage(needEncrypt?: boolean) {
  const set = (key: string, value: any) => {
    const serializer = getSerializer(key, value, true)
    const serializedValue = serializer.write(value)
    const result = needEncrypt ? encrypt(serializedValue) : serializedValue

    window.localStorage.setItem(key, result)

    return result
  }

  const get = (key: string) => {
    const storageValue = window.localStorage.getItem(key)
    if (!storageValue) return ''

    const value = needEncrypt ? decrypt(storageValue) : storageValue
    const serializer = getSerializer(key)
    const result = serializer.read(value)

    return result
  }

  const remove = (key: string) => {
    window.localStorage.removeItem(key)
  }

  const clear = () => {
    window.localStorage.clear()
  }

  return {
    set,
    get,
    remove,
    clear
  }
}
