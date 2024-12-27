import { Slash } from '@/constants'

/**
 * 路由 path 前拼接 /
 * @param path 原 path
 * @returns string 新 path
 */
export function formatPathSlash(path: string) {
  return path.startsWith(Slash) ? path : `${Slash}${path}`
}
