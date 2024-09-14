/**
 * 用户数据类型
 */
import type { EMPLOYEE_STATUS, GENDER, Y_N } from '@/constants'
import type { ValueOf } from '@/utils'

export type UserItem = {
  id?: number
  username?: string
  name?: string
  gender?: ValueOf<typeof GENDER>
  tel?: string
  email?: string
  address?: string
  isAdmin?: ValueOf<typeof Y_N>
  status?: ValueOf<typeof EMPLOYEE_STATUS>
}
