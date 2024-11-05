/**
 * 权限 controller
 */
import { INTERFACE_PATH } from '@constants/path'
import { AuthService } from '@services/auth.service'
import {
  Authorized,
  Body,
  BodyParam,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  QueryParam,
  QueryParams
} from 'routing-controllers'
import { BaseController } from './base/base-controller'
import type { Auth } from '@entities/auth.entity'

@Controller('/auth')
@Authorized()
export class AuthController extends BaseController {
  constructor() {
    super(new AuthService())
  }

  /**
   * 分页列表查询
   * @returns
   */
  @Get(`${INTERFACE_PATH.LIST_BY_PAGE}`)
  listByPage(@QueryParams() params: Record<string, any>) {
    return super.listByPage(params)
  }

  /**
   * 详情查询
   * @returns
   */
  @Get(`${INTERFACE_PATH.QUERY_BY_ID}`)
  detail(@Param('id') id: number) {
    return super.detail(id)
  }

  /**
   * 保存
   * @returns
   */
  @Post(`${INTERFACE_PATH.SAVE}`)
  save(@Body() entity: any) {
    return super.save(entity)
  }

  /**
   * 删除
   */
  @Delete(`${INTERFACE_PATH.BY_ID}`)
  softDelete(@Param('id') id: number) {
    return super.delete(id)
  }

  /**
   * 启用/停用
   */
  @Put(`${INTERFACE_PATH.CHANGE_STATUS}`)
  changeStatus(
    @BodyParam('id') id: number,
    @BodyParam('status') status: string
  ) {
    return super.changeStatus(id, status)
  }

  /**
   * 分配资源
   */
  @Post('/distribute')
  distribute(@Body() body: typeof Auth) {
    return this.currentService.distribute(body)
  }

  /**
   * 获取 authId 已分配的资源列表
   */
  @Get('/distributedMenus')
  queryDistributedMenus(@QueryParam('id') id: string) {
    return this.currentService.queryDistributedMenus(id)
  }
}
