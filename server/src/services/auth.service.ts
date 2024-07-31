/**
 * 权限服务类
 */
import { Auth } from '@entities/auth.entity'
import { BaseService } from './base/base-service'
import { UserService } from './user.service'

export class AuthService extends BaseService {
  userService = new UserService()
  authService = new AuthService()
  constructor() {
    super(Auth)
  }
}
