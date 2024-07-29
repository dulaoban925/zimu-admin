/**
 * 菜单服务类
 */
import { Menu } from '@entities/menu.entity'
import { BaseService } from './base/base-service'

export class MenuService extends BaseService {
  constructor() {
    super(Menu)
  }
}
