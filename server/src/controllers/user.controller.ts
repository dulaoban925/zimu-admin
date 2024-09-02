/**
 * 用户 controller
 */
import { INTERFACE_PATH } from '@constants/path'
import { CURRENT_USER } from '@constants/redis-keys'
import { UserService } from '@services/user.service'
import { success } from '@utils/r'
import { get, hGet } from '@utils/redis'
import {
  Authorized,
  Controller,
  Get,
  Param,
  QueryParam
} from 'routing-controllers'
import { BaseController } from './base/base-controller'

@Controller('/user')
@Authorized()
export class UserController extends BaseController {
  constructor() {
    super(new UserService())
  }

  @Get(`${INTERFACE_PATH.LIST}`)
  async list() {
    return await super.list()
  }

  @Get(`${INTERFACE_PATH.BY_ID}`)
  async detail(@Param('id') id: string) {
    return await super.detail(id)
  }

  /**
   * 获取个人信息
   */
  @Get('/me')
  async queryByUsername() {
    const currentUsername = await get(CURRENT_USER)
    console.log('currentUsername', currentUsername)
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
}
