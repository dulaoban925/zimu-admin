/**
 * 权限服务类
 */
import { Auth } from '@entities/auth.entity'
import { BaseService } from './base-service'

export class AuthService extends BaseService {
  constructor() {
    super(Auth)
  }
}
