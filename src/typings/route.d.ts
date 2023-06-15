/* eslint-disable no-unused-vars */
import { ROUTE_COMPONENT_LAYOUT_VALUE } from '@/constants'
import { ValueOf } from '@/utils'
import { RouteRecordRaw, RouteRecordName } from 'vue-router'

declare module ZiMuRoute {
  type RouteComponent =
    | ValueOf<typeof ROUTE_COMPONENT_LAYOUT_VALUE>
    | ValueOf<Pick<RouteRecordRaw, 'component'>>

  // 路由 Meta 属性
  interface RouteMeta {
    // 页面页签标题
    title: string
    // 是否缓存
    keepAlive?: boolean
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
}
