/**
 * 权限服务类
 */
import { Auth } from '@entities/auth.entity'
import { BaseService } from './base/base-service'

export class AuthService extends BaseService {
  constructor() {
    super(Auth)
  }

  /**
   * 根据用户名查询所有资源数据
   * @param username 用户名
   */
  async queryAuthByUsername(username: string) {
    /**
     * 1. 当前用户绑定的角色
     * 2. 所有角色关联的权限
     * 3. 所有权限关联的资源列表
     */
    console.log(username)
  }
}
