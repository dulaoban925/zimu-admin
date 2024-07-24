/**
 * 权限服务类
 */
import { Role } from '@entities/role.entity'
import { BaseService } from './base-service'

export class RoleService extends BaseService {
  constructor() {
    super(Role)
  }
}
