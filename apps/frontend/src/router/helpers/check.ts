import type { ZiMuRoute } from '@/typings/route'
import { constantVueRoutes } from '..'
import type { RouteRecordRaw } from 'vue-router'

/**
 * 是否有子路由
 * @param item - 权限路由
 */
export function hasChildren(item: ZiMuRoute.Route) {
  return !!(item.children && item.children.length)
}

/**
 * 是否有路由组件
 * @param item - 权限路由
 */
export function hasComponent(item: ZiMuRoute.Route) {
  return !!item.component
}

/**
 * 判断给定路由是否为固定路由，即 constantVueRoutes
 */
export function isConstantRoute(
  route: RouteRecordRaw,
  routes?: RouteRecordRaw[]
): boolean {
  routes = routes ?? constantVueRoutes
  let is = false
  for (const constantRoute of routes) {
    if (route.name === constantRoute.name) {
      is = true
      break
    }
    if (hasChildren(constantRoute)) {
      is = isConstantRoute(route, constantRoute.children)
      if (is) break
    }
  }

  return is
}
