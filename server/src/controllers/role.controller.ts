/**
 * 角色 controller
 */
import { RoleService } from '@services/role.service'
import { Controller } from 'routing-controllers'
import { BaseController } from './base/base-controller'

@Controller('/role')
export class RoleController extends BaseController {
  constructor() {
    super(new RoleService())
  }
}
