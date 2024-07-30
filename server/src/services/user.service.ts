/**
 * 用户服务类
 */
import { User } from '@entities/user.entity'
import { BaseService } from '@services/base/base-service'
import { FindOneOptions } from 'typeorm'

export class UserService extends BaseService {
  constructor() {
    super(User)
  }

  // 根据用户名查询用户详情
  queryByUsername(
    username: string,
    options: FindOneOptions<User> = {}
  ): Promise<any> {
    const findOptions = Object.assign({}, options, {
      where: {
        username
      }
    })
    return this.repository.findOne(findOptions)
  }
}
