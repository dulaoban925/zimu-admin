import { ROUTE_COMPONENT_LAYOUT_VALUE } from '@/constants'
import { ZiMuRoute } from '@/typings/route'
import { getLayoutComponent } from '../helpers'

const RouteComponents = {
  Dashboard: () => import('@/views/dashboard/index.vue')
}

const dashboardModule: ZiMuRoute.Route = {
  name: 'Dashboard',
  path: '/dashboard',
  component: getLayoutComponent(ROUTE_COMPONENT_LAYOUT_VALUE.BASIC),
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
