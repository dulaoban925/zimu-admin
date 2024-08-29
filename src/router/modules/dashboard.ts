import { ROUTE_COMPONENT_LAYOUT_VALUE } from '@/constants'
import type { ZiMuRoute } from '@/typings/route'

const RouteComponents = {
  Dashboard: () => import('@/views/dashboard/index.vue')
}

const dashboardModule: ZiMuRoute.Route = {
  name: 'Dashboard',
  path: '/dashboard',
  component: ROUTE_COMPONENT_LAYOUT_VALUE.BASIC,
  children: [
    {
      name: 'Home',
      path: '',
      component: RouteComponents.Dashboard,
      meta: { title: '主页', affix: true }
    }
  ],
  meta: { title: '主页' }
}

export default dashboardModule
