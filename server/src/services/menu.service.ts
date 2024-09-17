/**
 * 菜单服务类
 */
import { Menu } from '@entities/menu.entity'
import { BaseService } from './base/base-service'

export class MenuService extends BaseService {
  constructor() {
    super(Menu)
  }

  // 分页列表
  async queryByPage(page: number = 1, pageSize: number = 10, params: any = {}) {
    let { total, rows } = await super.queryByPage(page, pageSize, params)

    rows = rows.map((r: Menu) => ({
      ...r,
      typeText: r.typeText,
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
