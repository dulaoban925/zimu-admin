/**
 * 用户数据类型
 */
import type {
  EMPLOYEE_STATUS,
  EMPLOYEE_STATUS_DESC,
  GENDER,
  GENDER_DESC,
  Y_N
} from '@/constants'
import type { ValueOf } from '@/utils'
import type { RoleItem } from '@views/system-manage/role-manage/types'

export type UserItem = {
  id?: number
  username?: string
  name?: string
  gender?: ValueOf<typeof GENDER>
  genderText?: ValueOf<typeof GENDER_DESC>
  tel?: string
  email?: string
  address?: string
  isAdmin?: ValueOf<typeof Y_N>
  status?: ValueOf<typeof EMPLOYEE_STATUS>
  statusText?: ValueOf<typeof EMPLOYEE_STATUS_DESC>
  roles?: RoleItem[]
  version?: number
  createdBy?: string
  createdAt?: string
  updatedBy?: string
  updatedAt?: string
  deletedAt?: string
}
