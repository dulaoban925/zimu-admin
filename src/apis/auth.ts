/**
 * 权限相关api
 */
import { request } from '@/utils'

// 获取菜单列表
export async function getMenuList() {
  const result = await request({
    url: '/menu/list',
    method: 'get'
  })

  return result.data.rows
}
