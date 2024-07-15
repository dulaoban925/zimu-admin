/**
 * 用户服务类
 */
import db from '../tools/data-source'
import { Menu } from '../entities/menu.entity'

export class MenuService {
  menuRepository = db.getRepository(Menu)

  // 查询全部用户
  async queryList() {
    return await this.menuRepository.findAndCount()
  }
}
