/**
 * 权限 controller
 */
import { Authorized, Controller, Get, QueryParam } from 'routing-controllers'
import { AuthService } from '@services/auth.service'
import { success } from '@utils/r'
import { BaseController } from './base/base-controller'

@Controller('/auth')
export class AuthController extends BaseController {
  constructor() {
    super(new AuthService())
  }

  /**
   * 通过用户名获取所有权限，返回菜单、按钮、等所有资源
   * @param username 用户名
   */
  @Get('/userAuth')
  @Authorized()
  async queryAuthByUsername(
    @QueryParam('username', { required: true }) username: string
  ) {
    const resources = await this.currentService.queryAuthByUsername(username)

    return success(resources)
  }
}
