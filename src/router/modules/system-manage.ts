import { ROUTE_COMPONENT_LAYOUT_VALUE } from '@/constants'
import type { ZiMuRoute } from '@/typings/route'

const RouteComponents = {
  UserManage: () => import('@/views/system-manage/user-manage/index.vue'),
  MenuManage: () => import('@/views/system-manage/menu-manage/index.vue'),
  AuthManage: () => import('@/views/system-manage/auth-manage/index.vue'),
  RoleManage: () => import('@/views/system-manage/role-manage/index.vue')
}

const systemSettingsRoutes: ZiMuRoute.Route = {
  name: 'SystemManage',
  path: '/system-manage',
  component: ROUTE_COMPONENT_LAYOUT_VALUE.BASIC,
  meta: { title: '系统管理' },
  children: [
    {
      name: 'UserManage',
      path: 'user-manage',
      component: RouteComponents.UserManage,
      meta: { title: '用户管理', keepAlive: true }
    },
    {
      name: 'MenuManage',
      path: 'menu-manage',
      component: RouteComponents.MenuManage,
      meta: { title: '菜单管理', keepAlive: true }
    },
    {
      name: 'AuthManage',
      path: 'auth-manage',
      component: RouteComponents.AuthManage,
      meta: { title: '权限管理', keepAlive: true }
    },
    {
      name: 'RoleManage',
      path: 'role-manage',
      component: RouteComponents.RoleManage,
      meta: { title: '角色管理', keepAlive: true }
    }
  ]
}

export default systemSettingsRoutes
