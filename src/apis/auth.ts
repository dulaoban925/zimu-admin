/**
 * 权限相关api
 */
import { request } from '@/utils'

// 获取菜单列表
export function getMenuList() {
  return request({
    url: '/menu/list',
    method: 'get'
  })
}
