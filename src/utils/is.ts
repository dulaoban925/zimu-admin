import { ACTIVATION_STATUS, EMPLOYEE_STATUS, Y_N } from '@/constants/data'

// 判断状态是否启用
export const isEnable = (status: string) =>
  status === ACTIVATION_STATUS.ACTIVATED

// 判断人员是否在职
export const isServing = (status: string) => status === EMPLOYEE_STATUS.SERVING

// 判断结果为是
export const isYes = (flag: string) => flag === Y_N.Y
