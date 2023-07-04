import { ROUTE_COMPONENT_LAYOUT_VALUE } from '@/constants'
import { ZiMuRoute } from '@/typings/route'

const RouteComponents = {
  UserManage: () => import('@/views/system-manage/user-manage/index.vue'),
  MenuManage: () => import('@/views/system-manage/menu-manage/index.vue')
}

const systemSettingsRoutes: ZiMuRoute.Route = {
  name: 'SystemManage',
  path: '/system-manage',
  component: ROUTE_COMPONENT_LAYOUT_VALUE.BASIC,
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
    }
  ],
  meta: { title: '系统管理' }
}

export default systemSettingsRoutes
