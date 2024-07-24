/**
 * 角色 controller
 */
import { Controller } from 'routing-controllers'
import { RoleService } from '@services/role.service'
import { BaseController } from './base/base-controller'

@Controller('/role')
export class RoleController extends BaseController {
  constructor() {
    super(new RoleService())
  }
}
