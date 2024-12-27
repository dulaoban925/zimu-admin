import type { ExpressErrorMiddlewareInterface } from 'routing-controllers'

// TODO: 全局错误处理
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err: any) => any) {
    console.log('🚀 ~ GlobalErrorHandler ~ error:', error)
    next(error)
  }
}
