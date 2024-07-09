import { R_CODE, R_DESC } from '../constants/return-enum'

interface R {
  code: string
  message: string
  data?: any
}

/**
 * 成功返回结果
 */
export function success(
  data?: Record<string, any>,
  message?: null | string,
  code?: null | string
): R {
  code = code ?? R_CODE.SUCCESS
  message = message ?? R_DESC[code]
  const result: R = {
    code,
    message
  }

  if (data) {
    result.data = data
  }

  return result
}

/**
 * 失败返回结果
 */
export function error(message?: string, code?: string, data?: any): R {
  code = code ?? R_CODE.SERVICE_ERROR
  message = message ?? R_DESC[code]
  const result: R = {
    code,
    message
  }

  if (data) {
    result.data = data
  }

  return result
}
