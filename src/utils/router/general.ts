import { ZiMuRoute } from '@/typings/route'
import { LayoutType, getLayoutComponent } from './component'
import { hasChildren, hasComponent } from './check'
import { RouteRecordRaw } from 'vue-router'

/**
 * 平铺路由
 * @param routes 路由配置
 */
export function transformRouteConfigToVueRoutes(routes: ZiMuRoute.Route[]) {
  if (!routes.length) return []
  const resultRoutes: RouteRecordRaw[] = routes
    .map(route => transformRouteConfigToVueRoute(route))
    .flat(1)
  console.log('resultRoutes', routes, resultRoutes)
  return resultRoutes
}

/**
 * 将路由配置转化为可用的 Vue 路由
 * @param route 路由配置
 */
function transformRouteConfigToVueRoute(route: ZiMuRoute.Route) {
  const resultRoute: RouteRecordRaw = { ...route } as RouteRecordRaw
  if (hasComponent(route)) {
    if (typeof route.component === 'string') {
      resultRoute.component = getLayoutComponent(route.component as LayoutType)
    }
  }
  if (hasChildren(route)) {
    const children = route.children
      ?.map(route => transformRouteConfigToVueRoute(route))
      .flat(1)
    resultRoute.children = children
  }

  return resultRoute
}
