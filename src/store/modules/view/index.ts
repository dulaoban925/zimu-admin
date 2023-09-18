/**
 * 视图页签 store
 */
import type { RouteRecordName } from 'vue-router'
import type { WithNever } from '@/utils'
import type { ZiMuRoute } from '@/typings/route.d.ts'
import { routes } from '@/router'
import { VIEW_DIFF_PROP } from '@/constants'
import { filterRoutesConfig, getRoutePath } from '@/router/helpers'

export const useViewStore = defineStore('view-store', () => {
  // 缓存视图，路由名称集合
  const cachedViews = ref<WithNever<RouteRecordName>[]>([])
  // 已访问的视图集合
  const visitedViews = ref<WithNever<ZiMuRoute.RouteLocationNormalized>[]>([])
  // 当前激活的视图页签，对应 【viewDiffProp】
  const activeView = ref<string>()

  // 新增访问视图，path 相同，则视为同一个视图
  const addVisitedView = (view: ZiMuRoute.RouteLocationNormalized) => {
    if (!view[VIEW_DIFF_PROP]) {
      console.error(`${String(view.name)} 路由配置有误：请确保配置了 path 属性`)
    }
    const matchIndex = visitedViews.value.findIndex(
      (r: ZiMuRoute.RouteLocationNormalized) =>
        r[VIEW_DIFF_PROP] === view[VIEW_DIFF_PROP]
    )
    const exist = matchIndex > -1
    if (exist) return
    visitedViews.value.push(view)
  }

  // 删除访问视图
  const delVisitedView = (view: ZiMuRoute.RouteLocationNormalized) => {
    const matchIndex = visitedViews.value.findIndex(
      r => r[VIEW_DIFF_PROP] === view[VIEW_DIFF_PROP]
    )
    const exist = matchIndex > -1
    if (!exist) return
    visitedViews.value.splice(matchIndex, 1)
  }

  // 新增缓存视图
  const addCachedView = (view: ZiMuRoute.RouteLocationNormalized) => {
    // 不需要缓存的条件: 1.未配置 name 属性 2.已缓存 3.meta.keepAlive 不为 true 4.blank layout
    const noNeedCache =
      !view.name ||
      cachedViews.value.includes(view.name!) ||
      !view.meta?.keepAlive ||
      !view.meta?.blank
    if (noNeedCache) return
    cachedViews.value.push(view.name!)
  }

  // 删除缓存视图
  const delCachedView = (view: ZiMuRoute.RouteLocationNormalized) => {
    if (!view.name) return
    const matchIndex = cachedViews.value.indexOf(view.name!)
    const exist = matchIndex > -1
    if (exist) cachedViews.value.splice(matchIndex, 1)
  }

  // 新增视图
  const addView = (view: ZiMuRoute.RouteLocationNormalized) => {
    // 类似深拷贝的作用，避免引用关系导致 visitedViews 元素随路由变化而改变，导致功能失效
    view = { ...view }
    addVisitedView(view)
    addCachedView(view)
  }

  // 删除视图
  const delView = (view: ZiMuRoute.RouteLocationNormalized) => {
    delVisitedView(view)
    delCachedView(view)
  }

  // 设置激活视图
  const setActiveView = (view: ZiMuRoute.RouteLocationNormalized) => {
    activeView.value = view[VIEW_DIFF_PROP]
  }

  /**
   * 初始化视图
   * 1.初始化固定视图页签
   * 2.激活当前视图页签
   */
  const initViews = (view: ZiMuRoute.RouteLocationNormalized) => {
    const affixViewRoutes: ZiMuRoute.Route[] = filterRoutesConfig(
      routes,
      (route: ZiMuRoute.Route) => !!route.meta?.affix
    )
    for (const route of affixViewRoutes) {
      const { name, meta } = route
      const path = getRoutePath(routes, route)
      const affixView: ZiMuRoute.RouteLocationNormalized = {
        name,
        path,
        fullPath: path,
        meta,
        params: {},
        matched: [],
        query: {},
        hash: '',
        redirectedFrom: void 0
      }
      addView(affixView)
    }
    // 若当前跳转的视图，不在固定视图内，新增
    const currentViewInFilteredRoutes =
      affixViewRoutes.findIndex(r => r.name === view.name) > -1
    !currentViewInFilteredRoutes && addView(view)
    setActiveView(view)
  }

  return {
    /** state start */
    cachedViews,
    visitedViews,
    activeView,
    /** state end */

    /** action start */
    initViews,
    addView,
    addVisitedView,
    addCachedView,
    delView,
    delVisitedView,
    delCachedView,
    setActiveView
    /** action end */
  }
})
