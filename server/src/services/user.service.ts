/**
 * 用户服务类
 */
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
  // async queryAuthByUsername(username: string) {
  //   // 1. 当前用户绑定的角色
  //   const { roles } = await this.queryByUsername(username, {
  //     relations: {
  //       roles: true
  //     }
  //   })
  //   const roleIds = roles.map((r: Role) => r.id)

  //   if (!roleIds.length) return []

  //   const { rows: rolesWithAuth, total } = await this.roleService.queryList(
  //     {
  //       id: In(roleIds)
  //     },
  //     {
  //       relations: {
  //         authorizations: true
  //       }
  //     }
  //   )
  //   if (!total) return []

  //   // 2. 所有角色关联的权限
  //   const authIds = [
  //     ...new Set(
  //       rolesWithAuth.reduce((ret: number[], role: Role) => {
  //         if (role.authorizations.length) {
  //           const authIdsOfRole = role.authorizations.map((a: Auth) => a.id)
  //           ret.push(...authIdsOfRole)
  //         }
  //         return ret
  //       }, []) as number[]
  //     )
  //   ]
  //   if (!authIds.length) return []

  //   const { rows: authsWithMenus, total: authTotal } =
  //     await this.authService.queryList(
  //       {
  //         id: In(authIds)
  //       },
  //       {
  //         relations: {
  //           menus: true
  //         }
  //       }
  //     )
  //   if (!authTotal) return []

  //   // 3. 所有权限关联的资源列表
  //   const menuIds = [
  //     ...new Set(
  //       authsWithMenus.reduce((ret: number[], auth: Auth) => {
  //         if (auth.menus.length) {
  //           const menuIdsOfAuth = auth.menus.map((m: Menu) => m.id)
  //           ret.push(...menuIdsOfAuth)
  //         }
  //         return ret
  //       }, []) as number[]
  //     )
  //   ]
  //   const { rows: allMenus } = await this.menuService.queryList({
  //     id: In(menuIds)
  //   })

  //   return allMenus
  // }
}
