/**
 * 菜单 controller
 */
import { MenuService } from '@services/menu.service'
import { Controller } from 'routing-controllers'
import { BaseController } from './base/base-controller'

@Controller('/menu')
export class MenuController extends BaseController {
  constructor() {
    super(new MenuService())
  }
}
