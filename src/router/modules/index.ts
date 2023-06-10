import { ZiMuRoute } from '@/typings/route'
import { transformModulesToRoutes } from '../helpers/module'

const modules = import.meta.glob('./*.ts', {
  eager: true
}) as ZiMuRoute.RouteModule

export default transformModulesToRoutes(modules)
