/**
 * 用户服务类
 */
import { ACTIVATION_STATUS, Y_N } from '@constants/enums'
import { User } from '@entities/user.entity'
import { BaseService } from '@services/base/base-service'
import { In, type FindOneOptions } from 'typeorm'
import { AuthService } from './auth.service'
import { MenuService } from './menu.service'
import { RoleService } from './role.service'
import type { Auth } from '@entities/auth.entity'
import type { Menu } from '@entities/menu.entity'
import type { Role } from '@entities/role.entity'

export class UserService extends BaseService {
  roleService = new RoleService()
  authService = new AuthService()
  menuService = new MenuService()
  constructor() {
    super(User)
  }

  // 分页列表
  async queryByPage(page: number = 1, pageSize: number = 10, params: any = {}) {
    let { total, rows } = await super.queryByPage(page, pageSize, params)

    rows = rows.map((r: User) => ({
      ...r,
      genderText: r.genderText,
      statusText: r.statusText
    }))

    return {
      total,
      pageSize,
      page,
      rows
    }
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

  /**
   * 根据用户名查询所有资源数据
   * @param username 用户名
   */
  async queryAuthByUsername(username: string) {
    // 1. 当前用户绑定的角色
    const { isAdmin, roles } = await this.queryByUsername(username, {
      relations: {
        roles: true
      }
    })

    // 若为超管权限，则返回所有的资源
    if (isAdmin === Y_N.Y) {
      const { rows: allMenus } = await this.menuService.queryList({
        status: ACTIVATION_STATUS.ACTIVATED
      })
      return allMenus
    }

    const roleIds = roles.map((r: Role) => r.id)
    if (!roleIds.length) return []
    const { rows: rolesWithAuth, total } = await this.roleService.queryList(
      {
        id: In(roleIds),
        status: ACTIVATION_STATUS.ACTIVATED
      },
      {
        relations: {
          authorizations: true
        }
      }
    )
    if (!total) return []

    // 2. 所有角色关联的权限
    const authIds = [
      ...new Set(
        rolesWithAuth.reduce((ret: number[], role: Role) => {
          if (role.authorizations.length) {
            const authIdsOfRole = role.authorizations.map((a: Auth) => a.id)
            ret.push(...authIdsOfRole)
          }
          return ret
        }, []) as number[]
      )
    ]
    if (!authIds.length) return []

    const { rows: authsWithMenus, total: authTotal } =
      await this.authService.queryList(
        {
          id: In(authIds),
          status: ACTIVATION_STATUS.ACTIVATED
        },
        {
          relations: {
            menus: true
          }
        }
      )
    if (!authTotal) return []

    // 3. 所有权限关联的资源列表
    const menuIds = [
      ...new Set(
        authsWithMenus.reduce((ret: number[], auth: Auth) => {
          if (auth.menus.length) {
            const menuIdsOfAuth = auth.menus.map((m: Menu) => m.id)
            ret.push(...menuIdsOfAuth)
          }
          return ret
        }, []) as number[]
      )
    ]
    const { rows: allMenus } = await this.menuService.queryList({
      id: In(menuIds),
      status: ACTIVATION_STATUS.ACTIVATED
    })

    return allMenus
  }

  /**
   * 更新密码
   *
   * @param username 用户名
   * @param password 密码
   */
  updatePassword(username: string, password: string) {
    return this.repository.update({ username }, { password })
  }

  /**
   * 查询以分配的角色列表
   */
  async queryDistributedRoleList(id: number) {
    const { roles } = await this.queryById(id, {
      relations: {
        roles: true
      }
    })
    return roles
  }

  /**
   * 分配
   */
  distribute(user: typeof User) {
    return this.save(user)
  }
}
