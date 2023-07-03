import { ZiMuRoute } from '@/typings/route'
import { hasChildren } from './check'
import { RouteRecordName } from 'vue-router'
import { formatPathSlash } from './format'

/**
 * 平铺路由配置
 * @param routes 原始路由配置数组
 */
export function flatRoutesConfig(
  routes: ZiMuRoute.Route[],
  parent?: RouteRecordName
) {
  let result: ZiMuRoute.Route[] = []

  if (!routes?.length) return result
  for (const config of routes) {
    if (parent) config.parent = parent
    result.push(config)
    if (hasChildren(config))
      result = result.concat(flatRoutesConfig(config.children!, config.name))
  }

  return result
}

/**
 * 从路由配置中筛选出符合 filterFn 函数逻辑的路由数组
 * @param routes 原始路由配置数组
 * @param filterFn 筛选函数，返回 true or false
 */
export function filterRoutesConfig(
  routes: ZiMuRoute.Route[],
  filterFn: (route: ZiMuRoute.Route) => boolean
): ZiMuRoute.Route[] {
  const flattedRouteConfigs = flatRoutesConfig(routes)
  const result = flattedRouteConfigs.filter(filterFn)

  return result
}

/**
 * 获取当前路由的 Path，拼接父路由
 * @param routes 原始路由配置数组
 * @param route 当前路由
 * @returns
 */
export function getRoutePath(
  routes: ZiMuRoute.Route[],
  route: ZiMuRoute.Route
) {
  let result = route?.path ? formatPathSlash(route.path) : ''

  const noNeedContinue = !route || !route.parent
  if (noNeedContinue) return result
  const parentRoute = filterRoutesConfig(
    routes,
    (r: ZiMuRoute.Route) => r.name === route.parent
  )[0]
  if (!parentRoute) return result
  if (parentRoute.parent)
    result = `${getRoutePath(routes, parentRoute)}${result}`
  else result = `${parentRoute.path}${result}`

  return formatPathSlash(result)
}
