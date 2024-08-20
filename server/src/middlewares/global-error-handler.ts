import type { ExpressErrorMiddlewareInterface } from 'routing-controllers'

export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err: any) => any) {
    console.log('🚀 ~ GlobalErrorHandler ~ error:', error)
    next(error)
  }
}
