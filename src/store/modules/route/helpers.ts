import { RouteRecordRaw } from 'vue-router'

/**
 * 通过菜单匹配生效的路由配置
 * @param menus 权限菜单
 */
export function matchRoutesByAuthMenus(
  routes: RouteRecordRaw[],
  menus: ZiMuAuth.Menu[]
) {
  if (!menus.length || !routes.length) return []
  const menuCodes = menus.map(m => m.code)
  const matchRoutes = (routes: RouteRecordRaw[]) => {
    const target: RouteRecordRaw[] = []
    for (const route of routes) {
      const matched = !route.name || menuCodes.includes(route.name as string)
      if (matched) {
        if (route.children?.length) {
          route.children = matchRoutes(route.children)
        }
        target.push(route)
      }
    }

    return target
  }

  const result: RouteRecordRaw[] = matchRoutes(routes)
  return result
}
