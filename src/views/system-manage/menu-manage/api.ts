/**
 * 菜单管理接口请求集合
 */
import { request } from '@/utils'
async function getList(page: number, pageSize: number) {
  const { data } = await request({
    url: `/menu/listByPage?page=${page}&pageSize=${pageSize}`,
    method: 'get'
  })

  return data
}

export { getList }
