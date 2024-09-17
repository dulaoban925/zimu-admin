/**
 * 数据类型
 */
import type { ACTIVATION_STATUS, ACTIVATION_STATUS_DESC } from '@/constants'
import type { ValueOf } from '@/utils'

export type RoleItem = {
  id?: number
  code?: string
  name?: string
  status?: ValueOf<typeof ACTIVATION_STATUS>
  statusText?: ValueOf<typeof ACTIVATION_STATUS_DESC>
  version?: number
  createdBy?: string
  createdAt?: string
  updatedBy?: string
  updatedAt?: string
  deletedAt?: string
}
