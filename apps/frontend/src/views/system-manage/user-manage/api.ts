/**
 * 用户管理接口请求集合
 */
import { request, type Nullable } from '@/utils'
import { objectToQueryString } from '@/utils/normal'
import type { UserItem } from './types'
import type { RoleItem } from '@views/system-manage/role-manage/types'

const INTERFACE_PREFIX = '/user'

/**
 * 获取列表
 * @param page 当前页数
 * @param pageSize 每页数据量
 * @returns
 */
export async function getList(
  page: number,
  pageSize: number,
  filter: Record<string, any> = {}
): Promise<UserItem[]> {
  const query = objectToQueryString(
    Object.assign({}, filter, { page, pageSize })
  )
  const { data } = await request.get(`${INTERFACE_PREFIX}/listByPage?${query}`)

  return data
}

/**
 * 获取详情
 * @param id id
 * @returns
 */
export async function getDetail(id: number): Promise<Nullable<UserItem>> {
  if (!id) {
    console.error('id 为空，请检查')
    return null
  }

  const { data } = await request.get(`${INTERFACE_PREFIX}/query/${id}`)

  return data
}

/**
 * 保存
 * @param id id
 * @returns
 */
export async function save(user: UserItem): Promise<UserItem> {
  const { data } = await request.post(`${INTERFACE_PREFIX}/save`, {
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
  const { data } = await request.delete(`${INTERFACE_PREFIX}/${id}`)

  return data
}

/**
 * 重置密码
 * @param id id
 * @returns
 */
export async function resetPassword(id: number): Promise<UserItem> {
  const { data } = await request.get(`${INTERFACE_PREFIX}/resetPassword/${id}`)

  return data
}

/**
 * 分配
 */
export async function distribute(user: UserItem) {
  const { data } = await request.post(`${INTERFACE_PREFIX}/distribute`, {
    data: user
  })
  return data
}

/**
 * 获取已分配的角色列表
 */
export async function getDistributedRoleList(id: number): Promise<RoleItem[]> {
  const { data } = await request.get(
    `${INTERFACE_PREFIX}/distributedRoleList?id=${id}`
  )

  return data
}
