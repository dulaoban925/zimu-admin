/**
 * localStorage hook
 */
export function useLocalStorage(encrypt?: boolean) {
  const set = (key: string, value: any) => {
    window.localStorage.setItem(key, value)
  }

  const get = (key: string) => {
    return window.localStorage.getItem(key)
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
