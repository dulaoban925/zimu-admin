import { INTERFACE_PATH } from '@constants/path'
import {
  Authorized,
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put
} from 'routing-controllers'

export class BaseController {
  currentService
  constructor(service: any) {
    this.currentService = service
  }

  /**
   * 全列表查询
   * @returns
   */
  @Get(`${INTERFACE_PATH.LIST}`)
  @Authorized()
  async list() {
    return await this.currentService.queryList()
  }

  /**
   * 分页列表查询
   * @returns
   */
  @Get(`${INTERFACE_PATH.LIST_BY_PAGE}`)
  @Authorized()
  async listByPage() {
    return await this.currentService.queryByPage()
  }

  /**
   * 详情查询
   * @returns
   */
  @Get(`${INTERFACE_PATH.BY_ID}`)
  @Authorized()
  async detail(@Param('id') id: string) {
    return await this.currentService.queryById(id)
  }

  /**
   * 新增
   * @returns
   */
  @Post(`${INTERFACE_PATH.INSERT}`)
  @Authorized()
  async insert(@Body() entity: any) {
    return await this.currentService.insert(entity)
  }

  /**
   * 修改
   * @returns
   */
  @Put(`${INTERFACE_PATH.BY_ID}`)
  @Authorized()
  async update(@Body() entity: any) {
    return await this.currentService.update(entity)
  }

  /**
   * 删除
   * @returns
   */
  @Delete(`${INTERFACE_PATH.BY_ID}`)
  @Authorized()
  async delete(@Param('id') id: string) {
    return await this.currentService.delete(id)
  }

  /**
   * 软删除
   * @returns
   */
  @Delete(`/soft/${INTERFACE_PATH.BY_ID}`)
  @Authorized()
  async softDelete(@Param('id') id: string) {
    return await this.currentService.softDelete(id)
  }
}
