/**
 * 用户服务类
 */
import db from '../data-source'
import { User } from '../entities/user.entity'
import { BaseService } from './base.service'

const userRepository = db.getRepository(User)

export class UserService extends BaseService {
  // 查询全部用户
  async queryList() {
    const res = await userRepository.findAndCount()
    console.log('res', res)
    return res
  }

  // 根据用户名查询用户详情
  async queryByUsername(username: string) {
    const res = await userRepository.findOneBy({
      username
    })
    console.log('res', res)
    return res
  }
}
