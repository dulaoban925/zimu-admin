/**
 * 用户 controller
 */
import { Controller } from 'routing-controllers'
import { UserService } from '@services/user.service'
import { BaseController } from './base-controller'

@Controller('/user')
export class UserController extends BaseController {
  constructor() {
    super(new UserService())
  }
}
