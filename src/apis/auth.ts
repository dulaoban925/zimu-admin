/**
 * 权限相关api
 */
import { request } from '@/utils'

// 获取菜单列表
function getMenuList() {
  return request({
    url: '/menu/list',
    method: 'get'
  })
}

export { getMenuList }
