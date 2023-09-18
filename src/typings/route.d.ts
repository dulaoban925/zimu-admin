/* eslint-disable no-unused-vars */
import type { ValueOf } from '@/utils'
import type {
  RouteRecordRaw,
  RouteRecordName,
  RouteLocationNormalizedLoaded
} from 'vue-router'
import { ROUTE_COMPONENT_LAYOUT_VALUE } from '@/constants'

declare namespace ZiMuRoute {
  type RouteComponent =
    | ValueOf<typeof ROUTE_COMPONENT_LAYOUT_VALUE>
    | ValueOf<Pick<RouteRecordRaw, 'component'>>

  // 路由 Meta 属性
  interface RouteMeta {
    // 页面页签标题
    title?: string
    // 是否缓存
    keepAlive?: boolean
    // 是否全屏页面，不需要 header sidebar 等, component: 'blank' 时设置
    blank?: boolean
    // 是否固定，设置了该属性的路由视图页签始终显示，不允许关闭
    affix?: boolean
  }

  // 路由信息
  type Route = {
    component?: RouteComponent
    meta?: RouteMeta
    parent?: RouteRecordName
    children?: Route[]
  } & Omit<RouteRecordRaw, 'component' | 'meta' | 'children'>

  // 路由模块
  type RouteModule = Record<string, { default: Route }>

  type RouteLocationNormalized = {
    meta?: RouteMeta
  } & Omit<RouteLocationNormalizedLoaded, 'meta'>
}
