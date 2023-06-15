import { ROUTE_COMPONENT_LAYOUT_VALUE } from '@/constants'
import { ZiMuRoute } from '@/typings/route'

const DashboardModules = {
  Dashboard: () => import('@/views/dashboard/index.vue')
}

const dashboardModule: ZiMuRoute.Route = {
  name: 'Dashboard',
  path: '/dashboard',
  component: ROUTE_COMPONENT_LAYOUT_VALUE.BASIC,
  children: [
    {
      name: 'dashboard',
      path: '',
      component: DashboardModules.Dashboard
    }
  ]
}

export default dashboardModule
