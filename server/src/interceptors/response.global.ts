/**
 * 响应全局拦截器
 */
import { Action, Interceptor, InterceptorInterface } from 'routing-controllers'
import { success, error } from '@utils/r'

@Interceptor()
export class ResponseGlobalInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any) {
    console.log('🚀 ~ ResponseGlobalInterceptor ~ intercept:')
    if (content instanceof Error)
      return error(`${content.name}: ${content.message}`)
    if (!content.code) return success(content)
    return content
  }
}
