import { ROUTE_COMPONENT_LAYOUT_VALUE } from '@/constants'
import { ZiMuRoute } from '@/typings/route'

const RouteComponents = {
  UserManage: () => import('@/views/system-setting/user-manage/index.vue'),
  MenuManage: () => import('@/views/system-setting/menu-manage/index.vue')
}

const systemSettingsRoutes: ZiMuRoute.Route = {
  name: 'system-setting',
  path: '/system-setting',
  component: ROUTE_COMPONENT_LAYOUT_VALUE.BASIC,
  children: [
    {
      name: 'system-setting_user-manage',
      path: 'user-manage',
      component: RouteComponents.UserManage,
      meta: { title: '用户管理', keepAlive: true }
    },
    {
      name: 'system-setting_menu-manage',
      path: 'menu-manage',
      component: RouteComponents.MenuManage,
      meta: { title: '菜单管理', keepAlive: true }
    }
  ]
}

export default systemSettingsRoutes
