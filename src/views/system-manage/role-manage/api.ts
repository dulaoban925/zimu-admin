/**
 * 角色管理接口请求集合
 */
import { request } from '@/utils'
function getList() {
  return request({
    url: '/role/list',
    method: 'get'
  })
}

export { getList }
