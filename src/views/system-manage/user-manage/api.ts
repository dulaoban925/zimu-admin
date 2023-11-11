/**
 * 用户管理接口请求集合
 */
import { request } from '@/utils'
function getList() {
  return request({
    url: '/user/list',
    method: 'get'
  })
}

export { getList }
