/**
 * 菜单管理接口请求集合
 */
import { request, type Nullable, type ValueOf } from '@/utils'
import type { ACTIVATION_STATUS } from '@/constants'
import type { MenuItem } from './types'

/**
 * 获取菜单列表
 * @param page 当前页数
 * @param pageSize 每页数据量
 * @returns
 */
export async function getList(
  page: number,
  pageSize: number
): Promise<MenuItem[]> {
  const { data } = await request({
    url: `/menu/listByPage?page=${page}&pageSize=${pageSize}`,
    method: 'get'
  })

  return data
}

/**
 * 获取菜单详情
 * @param id 菜单 id
 * @returns
 */
export async function getDetail(id: string): Promise<Nullable<MenuItem>> {
  if (!id) {
    console.error('菜单 id 为空，请检查')
    return null
  }

  const { data } = await request({
    url: `/menu/query/${id}`,
    method: 'get'
  })

  return data
}

/**
 * 保存
 * @param id 菜单 id
 * @returns
 */
export async function save(menu: MenuItem): Promise<MenuItem> {
  const { data } = await request({
    url: `/menu/upsert`,
    method: 'post',
    data: menu
  })

  return data
}

/**
 * 删除
 * @param id 菜单 id
 * @returns
 */
export async function del(id: number): Promise<MenuItem> {
  const { data } = await request({
    url: `/menu/${id}`,
    method: 'delete'
  })

  return data
}

/**
 * 启用/停用
 * @param id 菜单 id
 * @param status 要变更的状态
 * @returns
 */
export async function changeStatus(
  id: number,
  status: ValueOf<typeof ACTIVATION_STATUS>
): Promise<MenuItem> {
  const { data } = await request({
    url: `/menu/changeStatus`,
    method: 'put',
    data: {
      id,
      status
    }
  })

  return data
}
