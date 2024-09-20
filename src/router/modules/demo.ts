/**
 * demo 管理路由
 */
import { ROUTE_COMPONENT_LAYOUT_VALUE } from '@/constants'
import type { ZiMuRoute } from '@/typings/route'

const RouteComponents = {
  BackdropFilter: () =>
    import('@/views/demo-manage/css-demo-manage/backdrop-filter/index.vue')
}

const demoManageRoutes: ZiMuRoute.Route = {
  name: 'DemoManage',
  path: '/demo-manage',
  component: ROUTE_COMPONENT_LAYOUT_VALUE.BASIC,
  meta: { title: 'Demo管理' },
  children: [
    {
      name: 'CssDemoManage',
      path: '/css-demo-manage',
      meta: { title: 'CSS Demo 管理', keepAlive: true },
      children: [
        {
          name: 'BackdropFilter',
          path: '/backdrop-filter',
          component: RouteComponents.BackdropFilter,
          meta: { title: 'BackdropFilter', keepAlive: true }
        }
      ]
    }
  ]
}

export default demoManageRoutes
