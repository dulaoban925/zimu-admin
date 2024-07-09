import { Get, Authorized } from 'routing-controllers'
import { INTERFACE_PATH } from '../constants/path'

export class BaseController {
  currentService
  constructor(service: any) {
    this.currentService = service
  }

  @Get(`${INTERFACE_PATH.LIST}`)
  @Authorized()
  async queryList() {
    const [rows, count] = await this.currentService.queryList()
    return {
      rows,
      count
    }
  }
}
