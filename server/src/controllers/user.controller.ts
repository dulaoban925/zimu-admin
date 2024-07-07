/**
 * 用户 controller
 */
import { Controller, Get } from 'routing-controllers'
import { UserService } from '../services/user.service'
import { INTERFACE_PATH } from '../constants/path'

@Controller('/user')
export class UserController {
  userService = new UserService()

  @Get(`${INTERFACE_PATH.LIST}`)
  queryList() {
    return this.userService.queryList()
  }
}
