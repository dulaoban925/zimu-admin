/**
 * 用户管理接口请求集合
 */
import { request, type Nullable } from '@/utils'
import { objectToQueryString } from '@/utils/normal'
import type { UserItem } from './types'

/**
 * 获取列表
 * @param page 当前页数
 * @param pageSize 每页数据量
 * @returns
 */
export async function getList(
  page: number,
  pageSize: number,
  filter: Record<string, string> = {}
): Promise<UserItem[]> {
  const query = objectToQueryString(
    Object.assign({}, filter, { page, pageSize })
  )
  const { data } = await request({
    url: `/user/listByPage?${query}`,
    method: 'get'
  })

  return data
}

/**
 * 获取详情
 * @param id id
 * @returns
 */
export async function getDetail(id: string): Promise<Nullable<UserItem>> {
  if (!id) {
    console.error('id 为空，请检查')
    return null
  }

  const { data } = await request({
    url: `/user/query/${id}`,
    method: 'get'
  })

  return data
}

/**
 * 保存
 * @param id id
 * @returns
 */
export async function save(user: UserItem): Promise<UserItem> {
  const { data } = await request({
    url: `/user/save`,
    method: 'post',
    data: user
  })

  return data
}

/**
 * 删除
 * @param id id
 * @returns
 */
export async function del(id: number): Promise<UserItem> {
  const { data } = await request({
    url: `/user/${id}`,
    method: 'delete'
  })

  return data
}
