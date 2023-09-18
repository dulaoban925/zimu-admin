import { transformModulesToRoutes } from '../helpers'
import { ZiMuRoute } from '@/typings/route'

const modules = import.meta.glob('./*.ts', {
  eager: true
}) as ZiMuRoute.RouteModule

export const routes = transformModulesToRoutes(modules)
