import { ZiMuRoute } from '@/typings/route'
import { LayoutType, getLayoutComponent } from './component'

/**
 * 平铺路由
 * @param routes 路由配置
 */
export function flatVueRoutes(
  routes: ZiMuRoute.Route[],
  parentRoute?: ZiMuRoute.Route
) {
  if (!routes.length) return []
  const resultRoutes: ZiMuRoute.Route[] = []
  for (const route of routes) {
    resultRoutes.push(transformRouteConfigToVueRoute(route, parentRoute))

    if (route.children?.length) {
      resultRoutes.push(...flatVueRoutes(route.children, route))
    }
  }

  return resultRoutes
}

/**
 * 将路由配置转化为可用的 Vue 路由
 * @param route 路由配置
 */
function transformRouteConfigToVueRoute(
  route: ZiMuRoute.Route,
  parentRoute?: ZiMuRoute.Route
) {
  if (!route.name) {
    throw new Error('路由解析失败: name 配置不可省略')
  }
  if (parentRoute?.name) route.parent = parentRoute.name
  // 若 component 是字符串，则为匹配 Layout
  if (typeof route.component === 'string') {
    route.component = getLayoutComponent(route.component as LayoutType)
  }

  return route
}
