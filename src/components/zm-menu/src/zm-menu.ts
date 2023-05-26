import { isString } from '@vue/shared'

export const checkIndexPath = (indexPath: unknown): indexPath is string[] =>
  Array.isArray(indexPath) && indexPath.every(path => isString(path))
