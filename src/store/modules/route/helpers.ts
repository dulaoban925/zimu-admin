import { constantVueRoutes } from '@/router'
import { isConstantRoute } from '@/router/helpers'
import type { RouteRecordRaw } from 'vue-router'

/**
 * 通过菜单匹配生效的路由配置
 * @param menus 权限菜单
 */
export function matchRoutesByAuthMenus(
  vueRoutes: RouteRecordRaw[],
  menus: ZiMuAuth.Menu[]
) {
  if (!menus.length || !vueRoutes.length) return [...constantVueRoutes]
  const menuCodes = menus.map(m => m.code)
  const matchRoutes = (routes: RouteRecordRaw[]) => {
    // 系统固定路由不参与匹配，直接允许访问
    const target: RouteRecordRaw[] = []
    for (const route of routes) {
      /**
       * 匹配条件：
       * 1. route 未定义 name 属性，通常不存在该情况 或 route.name 在权限菜单内
       * 2. route 不是固定路由配置(即无需权限配置，即可访问的路由，通常包括 登录页，错误页，首页等)
       */
      const matched =
        (!route.name || menuCodes.includes(route.name as string)) &&
        !isConstantRoute(route)
      if (matched) {
        // 首页控制台路由，可能存在二级的路由，但不需要维护二级菜单，跳过 children 路由匹配
        const isDashboard = route.path === import.meta.env.VITE_ROUTE_HOME_PATH
        if (route.children?.length && !isDashboard) {
          route.children = matchRoutes(route.children)
        }
        // 若 target 中不存在该 route，则加入 target
        target.push(route)
      }
    }

    return target
  }

  const matchedRoutes: RouteRecordRaw[] = matchRoutes(vueRoutes)
  const allRoutes = [...constantVueRoutes, ...matchedRoutes]
  console.log('🚀 ~ allRoutes:', allRoutes)
  return allRoutes
}
