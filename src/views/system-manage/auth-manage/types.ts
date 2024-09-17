/**
 * 用户数据类型
 */
import type { ACTIVATION_STATUS } from '@/constants'
import type { ValueOf } from '@/utils'

export type AuthItem = {
  id?: number
  code?: string
  name?: string
  status?: ValueOf<typeof ACTIVATION_STATUS>
}
