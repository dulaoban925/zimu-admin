/**
 * 权限服务类
 */
import { Auth } from '@entities/auth.entity'
import { Role } from '@entities/role.entity'
import { In } from 'typeorm'
import { BaseService } from './base/base-service'
import { UserService } from './user.service'

export class AuthService extends BaseService {
  userService = new UserService()
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
    const { roles } = await this.userService.queryByUsername(username, {
      relations: {
        roles: true
      }
    })

    if (!roles.length) return []
    const roleIds = roles.map((r: Role) => r.id)

    const { rows: rolesWithAuth, total } = await this.queryList(
      {
        id: In(roleIds)
      },
      {
        relations: {
          authorizations: true
        }
      }
    )

    if (!total) return []

    const allAuths = rolesWithAuth.reduce((ret, role) => {
      if (role.authorizations.length) {
        ret.push(...role.authorizations)
      }
      return ret
    }, [])

    console.log(allAuths)
    // TODO: 权限列表查询所有资源
  }
}
