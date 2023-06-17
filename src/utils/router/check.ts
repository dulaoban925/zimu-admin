import { ZiMuRoute } from '@/typings/route'

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
