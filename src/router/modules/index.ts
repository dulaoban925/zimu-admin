import { ZiMuRoute } from '@/typings/route'
import { transformModulesToRoutes } from '../helpers'

const modules = import.meta.glob('./*.ts', {
  eager: true
}) as ZiMuRoute.RouteModule

export const routes = transformModulesToRoutes(modules)
