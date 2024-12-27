/**
 * 用户 controller
 */
import { INTERFACE_PATH } from '@constants/path'
import { CURRENT_USER } from '@constants/redis-keys'
import { UserService } from '@services/user.service'
import { get as getConfig } from '@tools/env-config'
import { encryptPassword } from '@utils/pwd'
import { success } from '@utils/r'
import { get } from '@utils/redis'
import {
  Authorized,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  QueryParam,
  QueryParams
} from 'routing-controllers'
import { BaseController } from './base/base-controller'
import type { User } from '@entities/user.entity'

@Controller('/user')
@Authorized()
export class UserController extends BaseController {
  constructor() {
    super(new UserService())
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
   * 获取个人信息
   */
  @Get('/me')
  async queryByUsername() {
    const currentUsername = await get(CURRENT_USER)
    const userInfo = await this.currentService.queryByUsername(currentUsername)

    return success(userInfo)
  }

  /**
   * 通过用户名获取所有权限，返回菜单、按钮、等所有资源
   *
   * @param username 用户名
   * @returns resources 所有菜单资源数组
   */
  @Get('/auth')
  async queryAuthByUsername(@QueryParam('username') username?: string) {
    // 若为显示传递，则获取当前登录用户权限
    const currentUsername = username ?? (await get(CURRENT_USER))
    const resources =
      await this.currentService.queryAuthByUsername(currentUsername)

    return success(resources)
  }

  /**
   * 重置密码
   */
  @Get('/resetPassword/:id')
  async resetPassword(@Param('id') id: number) {
    // 加密密码
    const resetPassword = await encryptPassword(
      getConfig('resetPassword') as string
    )
    // 更新用户密码
    await this.currentService.save({ id, password: resetPassword })

    return true
  }

  /**
   * 查询以分配的权限列表
   */
  @Get('/distributedRoleList')
  queryDistributedRoleList(@QueryParam('id') id: number) {
    return this.currentService.queryDistributedRoleList(id)
  }

  /**
   * 分配
   */
  @Post('/distribute')
  distribute(@Body() body: typeof User) {
    return this.currentService.distribute(body)
  }
}
