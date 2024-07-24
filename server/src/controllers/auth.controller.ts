/**
 * 权限 controller
 */
import { Controller } from 'routing-controllers'
import { AuthService } from '@services/auth.service'
import { BaseController } from './base-controller'

@Controller('/auth')
export class AuthController extends BaseController {
  constructor() {
    super(new AuthService())
  }
}
