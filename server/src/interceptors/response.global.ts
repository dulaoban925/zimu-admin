/**
 * 响应全局拦截器
 */
import { error, success } from '@utils/r'
import {
  Interceptor,
  type Action,
  type InterceptorInterface
} from 'routing-controllers'

@Interceptor()
export class ResponseGlobalInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any) {
    console.log('🚀 ~ ResponseGlobalInterceptor ~ intercept:', action, content)
    if (content instanceof Error)
      return error(`${content.name}: ${content.message}`)
    if (!content.code) return success(content)
    return content
  }
}
