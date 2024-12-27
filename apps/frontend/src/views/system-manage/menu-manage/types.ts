/**
 * 数据类型
 */
import type {
  ACTIVATION_STATUS,
  ACTIVATION_STATUS_DESC,
  MENU_TYPE,
  MENU_TYPE_DESC
} from '@/constants'
import type { ValueOf } from '@/utils'

export type MenuItem = {
  id?: number
  code?: string
  name?: string
  type?: ValueOf<typeof MENU_TYPE>
  typeText?: ValueOf<typeof MENU_TYPE_DESC>
  parent?: string
  icon?: string
  navigateType?: string
  path?: string
  level?: number
  sort?: number
  status?: ValueOf<typeof ACTIVATION_STATUS>
  statusText?: ValueOf<typeof ACTIVATION_STATUS_DESC>
  version?: number
  createdBy?: string
  createdAt?: string
  updatedBy?: string
  updatedAt?: string
  deletedAt?: string
}
