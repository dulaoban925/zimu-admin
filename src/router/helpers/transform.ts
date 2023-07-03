import { ZiMuRoute } from '@/typings/route'
import { LayoutType, getLayoutComponent } from './component'
import { hasChildren, hasComponent } from './check'
import { RouteRecordRaw } from 'vue-router'

export function transformModulesToRoutes(modules: ZiMuRoute.RouteModule) {
  const routes: ZiMuRoute.Route[] = []

  Object.keys(modules).forEach(k => {
    const route = modules[k].default
    if (route) {
      routes.push(route)
    } else {
      const error = `路由模块: ${k} 解析出错`
      console.error(error)
    }
  })

  return routes
}

/**
 * 将路由配置转化为可用的 vue route
 * @param routes 路由配置
 */
export function transformRouteConfigToVueRoutes(routes: ZiMuRoute.Route[]) {
  if (!routes.length) return []
  const resultRoutes: RouteRecordRaw[] = routes.map(route =>
    transformRouteConfigToVueRoute(route)
  )
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
    const children = route.children?.map(route =>
      transformRouteConfigToVueRoute(route)
    )
    resultRoute.children = children
  }

  return resultRoute
}
