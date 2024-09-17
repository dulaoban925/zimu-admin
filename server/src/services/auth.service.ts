/**
 * 权限服务类
 */
import { Auth } from '@entities/auth.entity'
import { BaseService } from './base/base-service'

export class AuthService extends BaseService {
  constructor() {
    super(Auth)
  }

  // 分页列表
  async queryByPage(page: number = 1, pageSize: number = 10, params: any = {}) {
    let { total, rows } = await super.queryByPage(page, pageSize, params)

    rows = rows.map((r: Auth) => ({
      ...r,
      statusText: r.statusText
    }))

    return {
      total,
      pageSize,
      page,
      rows
    }
  }
}
