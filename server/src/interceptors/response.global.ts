/**
 * 响应全局拦截器
 */
import { Action, Interceptor, InterceptorInterface } from 'routing-controllers'
import { success } from '../utils/r'

@Interceptor()
export class ResponseGlobalInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any) {
    if (!content.code) return success(null, null, content)
    return content
  }
}
