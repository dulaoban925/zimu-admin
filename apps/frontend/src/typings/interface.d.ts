/**
 * 服务接口相关类型定义
 */
declare namespace ZiMuInterface {
  interface QueryListResponse<T = any> {
    rows: T[]
    total: number
  }

  interface QueryListByPageResponse<T = any> {
    rows: T[]
    total: number
    pageSize: number
    page: number
  }
}
