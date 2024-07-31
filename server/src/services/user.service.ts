/**
 * 用户服务类
 */
import { Role } from '@entities/role.entity'
import { User } from '@entities/user.entity'
import { BaseService } from '@services/base/base-service'
import { FindOneOptions, In } from 'typeorm'
import { Auth } from '@entities/auth.entity'
import { RoleService } from './role.service'
import { AuthService } from './auth.service'
import { MenuService } from './menu.service'

export class UserService extends BaseService {
  roleService = new RoleService()
  authService = new AuthService()
  menuService = new MenuService()
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

  // 根据用户名查询权限
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
    const { roles } = await this.queryByUsername(username, {
      relations: {
        roles: true
      }
    })

    if (!roles.length) return []
    const roleIds = roles.map((r: Role) => r.id)

    const { rows: rolesWithAuth, total } = await this.roleService.queryList(
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

    const authIds = rolesWithAuth.reduce((ret, role) => {
      if (role.authorizations.length) {
        const authIdsOfRole = role.authorizations.map((a: Auth) => a.id)
        ret.push(...authIdsOfRole)
      }
      return ret
    }, [])

    if (!authIds.length) return []

    const { rows: authsWithMenus, total: authTotal } =
      await this.authService.queryList(
        {
          id: In(authIds as any)
        },
        {
          relations: {
            menus: true
          }
        }
      )

    if (!authTotal) return []

    const allMenus = authsWithMenus.reduce((ret, auth) => {
      if (auth.menus.length) {
        ret.push(...auth.menus)
      }
      return ret
    }, [])

    return allMenus
  }
}
