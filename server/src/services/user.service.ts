/**
 * 用户服务类
 */
import db from '../data-source'
import { User } from '../entities/user.entity'

const userRepository = db.getRepository(User)

export class UserService {
  // 查询全部用户
  async queryList() {
    const res = await userRepository.findAndCount()
    console.log('res', res)
    return res
  }
}
