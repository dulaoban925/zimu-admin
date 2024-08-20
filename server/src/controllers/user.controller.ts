/**
 * 用户 controller
 */
import { UserService } from '@services/user.service'
import { success } from '@utils/r'
import { Authorized, Controller, Get, QueryParam } from 'routing-controllers'
import { BaseController } from './base/base-controller'

@Controller('/user')
export class UserController extends BaseController {
  constructor() {
    super(new UserService())
  }

  @Get('/info')
  @Authorized()
  async queryByUsername(
    @QueryParam('username', { required: true }) username: string
  ) {
    const userInfo = await this.currentService.queryByUsername(username)

    return success(userInfo)
  }

  /**
   * 通过用户名获取所有权限，返回菜单、按钮、等所有资源
   *
   * @param username 用户名
   * @returns resources 所有菜单资源数组
   */
  @Get('/auth')
  @Authorized()
  async queryAuthByUsername(
    @QueryParam('username', { required: true }) username: string
  ) {
    const resources = await this.currentService.queryAuthByUsername(username)

    return success(resources)
  }
}
