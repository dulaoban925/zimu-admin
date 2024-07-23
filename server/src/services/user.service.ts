/**
 * 用户服务类
 */
import { User } from '@entities/user.entity'
import { BaseService } from '@services/base-service'

export class UserService extends BaseService {
  constructor() {
    super(User)
  }

  // 根据用户名查询用户详情
  async queryByUsername(username: string) {
    return await this.repository.findOneBy({
      username
    })
  }
}
