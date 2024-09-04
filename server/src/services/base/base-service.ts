import { getDataSourceInstance } from '@tools/data-source'
import { isEmpty } from 'lodash'
import type { FindManyOptions, Repository } from 'typeorm'

export class BaseService {
  repository: Repository<any>
  constructor(entityClass: any) {
    this.repository = getDataSourceInstance().getRepository(entityClass)
  }

  // 查询列表
  async queryList(params: any = {}, options: FindManyOptions<any> = {}) {
    if (!isEmpty(params)) options.where = params
    const [rows, total] = await this.repository.findAndCount(options)
    return {
      rows,
      total
    }
  }

  // 分页列表
  async queryByPage(page: number = 1, pageSize: number = 10, params: any = {}) {
    // 总数
    const total = await this.repository.countBy(params)

    // 数据列表
    const skip = pageSize * (page - 1)
    const rows = await this.repository.find({
      where: params,
      skip,
      take: pageSize
    })

    return {
      total,
      pageSize,
      page,
      rows
    }
  }

  /**
   * 查询数据详情
   * @param id 主键
   */
  async queryById(id: string) {
    const detail = await this.repository.findOneBy({
      id
    })

    return detail ?? {}
  }

  // 新增
  async insert(entity: any) {
    if (!entity) {
      return Promise.reject(new Error('不存在待插入的实体对象'))
    }
    const { identifiers } = await this.repository.insert(entity)
    // 获取主键
    const id = identifiers[0].id
    if (!id) {
      return Promise.reject(new Error('保存失败, repository.insert 未生成 id'))
    }

    const detail = await this.queryById(id)

    // 返回插入数据详细信息
    return detail
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
