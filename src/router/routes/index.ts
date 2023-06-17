import { STATIC_ROUTE_NAME } from '@/constants'
import { ZiMuRoute } from '@/typings/route'

const RouteComponents = {
  404: () => import('@views/static/404/index.vue')
}

/** 根路由: */
export const ROOT_ROUTE: ZiMuRoute.Route = {
  name: STATIC_ROUTE_NAME.ROOT,
  path: '/',
  redirect: import.meta.env.VITE_ROUTE_HOME_PATH,
  meta: {
    title: 'Root'
  }
}

// 匹配无效路径的路由
const NotFound = {
  name: STATIC_ROUTE_NAME.NOT_FOUND,
  path: '/:pathMatch(.*)*',
  component: 'blank',
  meta: {
    title: '未找到'
  }
}

export const constantRoutes: ZiMuRoute.Route[] = [
  ROOT_ROUTE,
  {
    name: STATIC_ROUTE_NAME[404],
    path: '/404',
    component: RouteComponents[404],
    meta: {
      title: '未找到'
    }
  },
  NotFound
]
