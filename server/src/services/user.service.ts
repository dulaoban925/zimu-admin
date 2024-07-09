/**
 * 用户服务类
 */
import db from '../data-source'
import { User } from '../entities/user.entity'

export class UserService {
  userRepository = db.getRepository(User)

  // 查询全部用户
  async queryList() {
    return await this.userRepository.findAndCount()
  }

  // 根据用户名查询用户详情
  async queryByUsername(username: string) {
    return await this.userRepository.findOneBy({
      username
    })
  }
}
