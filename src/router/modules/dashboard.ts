import { ROUTE_COMPONENT_LAYOUT_VALUE } from '@/constants'
import { ZiMuRoute } from '@/typings/route'
import { getLayoutComponent } from '../helpers'

const RouteComponents = {
  Dashboard: () => import('@/views/dashboard/index.vue')
}

const dashboardModule: ZiMuRoute.Route = {
  path: '/dashboard',
  component: getLayoutComponent(ROUTE_COMPONENT_LAYOUT_VALUE.BASIC),
  children: [
    {
      name: 'dashboard',
      path: '',
      component: RouteComponents.Dashboard
    }
  ]
}

export default dashboardModule
