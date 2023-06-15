import { ZiMuRoute } from '@/typings/route'

export function transformModulesToRoutes(modules: ZiMuRoute.RouteModule) {
  const routes: ZiMuRoute.Route[] = []

  Object.keys(modules).forEach(k => {
    const route = modules[k].default
    if (route) {
      routes.push(route)
    } else {
      const error = `路由模块: ${k} 解析出错`
      console.error(error)
    }
  })

  return routes
}
