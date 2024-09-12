import { success } from '@utils/r'

export class BaseController {
  currentService
  constructor(service: any) {
    this.currentService = service
  }

  /**
   * 全列表查询
   * @returns
   */
  async list() {
    const list = await this.currentService.queryList()
    return success(list)
  }

  /**
   * 分页列表查询
   * @returns
   */
  async listByPage(page: number, pageSize: number) {
    const list = await this.currentService.queryByPage(page, pageSize)
    return success(list)
  }

  /**
   * 详情查询
   * @returns
   */
  async detail(id: number) {
    const detail = await this.currentService.queryById(id)
    return success(detail)
  }

  /**
   * 新增
   * @returns
   */
  async insert(entity: any) {
    const detail = await this.currentService.insert(entity)
    return success(detail)
  }

  /**
   * 修改
   * @returns
   */
  async update(entity: any) {
    const detail = await this.currentService.update(entity)
    return success(detail)
  }

  /**
   * 新增 or 编辑
   */
  async upsert(entity: any) {
    const data = await this.currentService.upsert(entity)
    return success(data)
  }

  /**
   * 删除
   * @returns
   */
  async delete(id: number) {
    const data = await this.currentService.delete(id)
    return success(data)
  }

  /**
   * 软删除
   * @returns
   */
  async softDelete(id: number) {
    const data = await this.currentService.softDelete(id)
    return success(data)
  }
}
