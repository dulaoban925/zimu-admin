/**
 * 权限 controller
 */
import { AuthService } from '@services/auth.service'
import { Controller } from 'routing-controllers'
import { BaseController } from './base/base-controller'

@Controller('/auth')
export class AuthController extends BaseController {
  constructor() {
    super(new AuthService())
  }
}
