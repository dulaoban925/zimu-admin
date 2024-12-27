import { isNumber } from 'lodash-es'

export const formatSize = (size: number | string) => {
  if (!size) return 'inherit'
  if (!isNumber(size) && size.endsWith('px')) return size
  return `${size}px`
}
