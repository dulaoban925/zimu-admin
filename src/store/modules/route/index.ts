/**
 * 路由 store
 */
import { routes, router } from '@/router'
import type { ValueOf } from '@/utils'
import { transformRouteConfigToVueRoutes } from '@/router/helpers'
import { matchRoutesByAuthMenus } from './helpers'

export const RouteMatchModeEnum = {
  Static: 'static',
  Dynamic: 'dynamic'
}

type RouteMatchMode = ValueOf<typeof RouteMatchModeEnum>

export const useRouteStore = defineStore('route-store', () => {
  // 路由匹配模式，static(静态：从代码中获取固定路由) or dynamic(动态：根据权限配置匹配)
  const mode = ref<RouteMatchMode>('static')

  // 初始化静态路由
  async function initStaticRoutes(menus: ZiMuAuth.Menu[]) {
    if (!routes.length) return
    // 将 路由配置 转化为可用的、平铺的 vue 路由
    const vueRoutes = transformRouteConfigToVueRoutes(routes)
    const matchedRoutes = matchRoutesByAuthMenus(vueRoutes, menus)
    console.log('matchedRoutes', matchedRoutes)
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
