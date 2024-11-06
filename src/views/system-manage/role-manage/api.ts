/**
 * 角色管理接口请求集合
 */
import { request, type Nullable, type ValueOf } from '@/utils'
import { objectToQueryString } from '@/utils/normal'
import type { ACTIVATION_STATUS } from '@/constants'
import type { AuthItem } from '@/views/system-manage/auth-manage/types'
import type { RoleItem } from './types'

// 接口前缀
const INTERFACE_PREFIX = '/role'

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
): Promise<RoleItem[]> {
  const query = objectToQueryString(
    Object.assign({}, filter, { page, pageSize })
  )
  const { data } = await request.get(`${INTERFACE_PREFIX}/listByPage?${query}`)

  return data
}

/**
 * 获取所有权限数据
 */
export async function getAllList(filter: Record<string, string | number> = {}) {
  let query = objectToQueryString(filter)
  query = query ? `?${query}` : ''
  const { data } = await request.get(`${INTERFACE_PREFIX}/list${query}`)

  return data
}

/**
 * 获取详情
 * @param id id
 * @returns
 */
export async function getDetail(id: number): Promise<Nullable<RoleItem>> {
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
export async function save(user: RoleItem): Promise<RoleItem> {
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
export async function del(id: number): Promise<RoleItem> {
  const { data } = await request.delete(`${INTERFACE_PREFIX}/${id}`)

  return data
}

/**
 * 启用/停用
 * @param id id
 * @param status 要变更的状态
 * @returns
 */
export async function changeStatus(
  id: number,
  status: ValueOf<typeof ACTIVATION_STATUS>
): Promise<RoleItem> {
  const { data } = await request.put(`${INTERFACE_PREFIX}/changeStatus`, {
    data: {
      id,
      status
    }
  })

  return data
}

/**
 * 分配
 */
export async function distribute(role: RoleItem) {
  const { data } = await request.post(`${INTERFACE_PREFIX}/distribute`, {
    data: role
  })
  return data
}

/**
 * 获取已分配的权限列表
 */
export async function getDistributedAuthList(id: number): Promise<AuthItem[]> {
  const { data } = await request.get(
    `${INTERFACE_PREFIX}/distributedAuthList?id=${id}`
  )

  return data
}
