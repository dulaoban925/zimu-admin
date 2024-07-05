import { STATIC_ROUTE_NAME } from '@/constants'
import { ZiMuRoute } from '@/typings/route'

const RouteComponents = {
  Login: () => import('@views/login/index.vue'), // 登录页
  404: () => import('@views/static/404/index.vue') // 404 页
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

/** 登录路由 */
const LOGIN_ROUTE: ZiMuRoute.Route = {
  name: STATIC_ROUTE_NAME.LOGIN,
  path: '/login',
  component: RouteComponents.Login,
  meta: {
    title: 'Login'
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
  LOGIN_ROUTE,
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
