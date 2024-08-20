/**
 * 路由 store
 */
import router, { routes } from '@/router'
import { transformRouteConfigToVueRoutes } from '@/router/helpers'
import type { ValueOf } from '@/utils'
import { matchRoutesByAuthMenus } from './helpers'

// 路由匹配模式枚举
export const RouteMatchModeEnum = {
  Static: 'static',
  Dynamic: 'dynamic'
}

type RouteMatchMode = ValueOf<typeof RouteMatchModeEnum>

export const useRouteStore = defineStore('route-store', () => {
  // 路由匹配模式
  // 1.static(静态：代码维护所有路由配置, 配合【菜单权限】控制，菜单配置的编码需要与路由 name 属性一致)
  // 2.【规划中...】dynamic(动态：代码维护基础路由配置，配合【路由权限】控制，路由信息完全由配置生成，无需在代码中编写)
  const mode = ref<RouteMatchMode>(RouteMatchModeEnum.Static)

  // 初始化静态路由
  function initStaticRoutes(menus: ZiMuAuth.Menu[]) {
    if (!routes.length) return
    // 将 路由配置 转化为可用的、平铺的 vue 路由
    const vueRoutes = transformRouteConfigToVueRoutes(routes)
    const matchedRoutes = matchRoutesByAuthMenus(vueRoutes, menus)
    for (const route of matchedRoutes) {
      router.addRoute(route)
    }
  }

  // 初始化动态路由
  function initDynamicRoutes() {}

  // 初始化权限路由
  const initRoutes = async (menus: ZiMuAuth.Menu[]) => {
    if (mode.value === RouteMatchModeEnum.Static) await initStaticRoutes(menus)
    else await initDynamicRoutes()
  }

  return {
    /** state start */
    mode,
    /** state end */

    /** action start */
    initRoutes
    /** action end */
  }
})
