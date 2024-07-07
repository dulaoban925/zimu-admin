/**
 * 返回结果相关枚举
 */
// 状态编码
export const R_CODE = {
  SERVICE_ERROR: '500',
  SUCCESS: '200'
}

// 状态描述
export const R_DESC = {
  [R_CODE.SERVICE_ERROR]: '异常',
  [R_CODE.SUCCESS]: '成功'
}
