/* eslint-disable no-unused-vars */
import { RouteRecordRaw } from 'vue-router'

declare module ZiMuRoute {
  type RouteModule = Record<string, { default: RouteRecordRaw }>
}
