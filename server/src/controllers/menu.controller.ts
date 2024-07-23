/**
 * 菜单 controller
 */
import { Controller } from 'routing-controllers'
import { MenuService } from '@services/menu.service'
import { BaseController } from './base-controller'

@Controller('/menu')
export class MenuController extends BaseController {
  constructor() {
    super(new MenuService())
  }
}
