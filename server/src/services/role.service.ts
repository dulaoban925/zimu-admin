/**
 * 角色服务类
 */
import { Role } from '@entities/role.entity'
import { BaseService } from './base/base-service'

export class RoleService extends BaseService {
  constructor() {
    super(Role)
  }

  // 分页列表
  async queryByPage(page: number = 1, pageSize: number = 10, params: any = {}) {
    let { total, rows } = await super.queryByPage(page, pageSize, params)

    rows = rows.map((r: Role) => ({
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

  /**
   * 查询以分配的权限列表
   */
  async queryDistributedAuthList(id: number) {
    const { authorizations } = await this.queryById(id, {
      relations: {
        authorizations: true
      }
    })
    return authorizations
  }

  /**
   * 分配
   */
  distribute(role: typeof Role) {
    return this.save(role)
  }
}
