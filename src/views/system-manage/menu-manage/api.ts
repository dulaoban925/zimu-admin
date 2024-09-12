/**
 * 菜单管理接口请求集合
 */
import { request, type Nullable } from '@/utils'
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
export async function getDetail(id: string): Promise<MenuItem | null> {
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
