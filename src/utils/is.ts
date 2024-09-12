import { ACTIVATION_STATUS } from '@/constants/data'

// 判断状态是否启用
export const isEnable = (status: string) =>
  status === ACTIVATION_STATUS.ACTIVATED
