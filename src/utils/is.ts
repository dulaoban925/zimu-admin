import { ENABLE_STATUS } from '@/constants/data'

// 判断状态是否启用
export const isEnable = (status: number) => status === ENABLE_STATUS.ENABLED
