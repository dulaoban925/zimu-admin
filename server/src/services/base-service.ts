import db from '../tools/data-source'

export class BaseService {
  repository
  entityClass
  constructor(entityClass: any) {
    this.entityClass = entityClass
    this.repository = db.getRepository(entityClass)
  }

  // 查询列表
  async queryList(params?: any) {
    const [rows, total] = await this.repository.findAndCountBy(params)
    return {
      rows,
      total
    }
  }

  // 分页列表
  async queryByPage(
    params: any = {},
    pageSize: number = 10,
    pageNum: number = 1
  ) {
    // 总数
    const total = await this.repository.countBy(params)

    // 数据列表
    const skip = pageSize * (pageNum - 1)
    const rows = await this.repository.find({
      where: params,
      skip,
      take: pageSize
    })

    return {
      total,
      pageSize,
      pageNum,
      rows
    }
  }

  /**
   * 查询数据详情
   * @param id 主键
   */
  async queryById(id: string) {
    return await this.repository.findOneBy({
      id
    })
  }

  // 新增
  async insert(entity: any) {
    if (!entity) {
      return Promise.reject(new Error('不存在待插入的实体对象'))
    }
    return await this.repository.insert(entity)
  }

  // 修改
  async update(entity: any = {}) {
    if (!entity.id) {
      return Promise.reject(new Error('id 不存在'))
    }
    return await this.repository.update(entity, { id: entity.id })
  }

  // 删除
  async delete(id: string) {
    if (!id) {
      return Promise.reject(new Error('id 不存在'))
    }
    return await this.repository.delete(id)
  }

  // 逻辑删除
  async softDelete(id: string) {
    if (!id) {
      return Promise.reject(new Error('id 不存在'))
    }
    return await this.repository.softDelete(id)
  }
}
