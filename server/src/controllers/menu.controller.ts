/**
 * 菜单 controller
 */
import { INTERFACE_PATH } from '@constants/path'
import { MenuService } from '@services/menu.service'
import {
  Authorized,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  QueryParam
} from 'routing-controllers'
import { BaseController } from './base/base-controller'

@Controller('/menu')
@Authorized()
export class MenuController extends BaseController {
  constructor() {
    super(new MenuService())
  }

  /**
   * 分页列表查询
   * @returns
   */
  @Get(`${INTERFACE_PATH.LIST_BY_PAGE}`)
  listByPage(
    @QueryParam('page') page: number,
    @QueryParam('pageSize') pageSize: number
  ) {
    return super.listByPage(page, pageSize)
  }

  /**
   * 分页列表查询
   * @returns
   */
  @Get(`${INTERFACE_PATH.QUERY_BY_ID}`)
  detail(@Param('id') id: number) {
    return super.detail(id)
  }

  /**
   * 新增 or 修改
   * @returns
   */
  @Post(`${INTERFACE_PATH.UPSERT}`)
  upsert(@Body() entity: any) {
    return super.upsert(entity)
  }

  /**
   * 删除
   */
  @Delete(`${INTERFACE_PATH.BY_ID}`)
  softDelete(@Param('id') id: number) {
    return super.delete(id)
  }
}
