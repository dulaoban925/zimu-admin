/**
 * 角色管理接口请求集合
 */
import { request, type Nullable, type ValueOf } from '@/utils'
import { objectToQueryString } from '@/utils/normal'
import type { ACTIVATION_STATUS } from '@/constants'
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
  const { data } = await request({
    url: `${INTERFACE_PREFIX}/listByPage?${query}`,
    method: 'get'
  })

  return data
}

/**
 * 获取详情
 * @param id id
 * @returns
 */
export async function getDetail(id: string): Promise<Nullable<RoleItem>> {
  if (!id) {
    console.error('id 为空，请检查')
    return null
  }

  const { data } = await request({
    url: `${INTERFACE_PREFIX}/query/${id}`,
    method: 'get'
  })

  return data
}

/**
 * 保存
 * @param id id
 * @returns
 */
export async function save(user: RoleItem): Promise<RoleItem> {
  const { data } = await request({
    url: `${INTERFACE_PREFIX}/save`,
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
export async function del(id: number): Promise<RoleItem> {
  const { data } = await request({
    url: `${INTERFACE_PREFIX}/${id}`,
    method: 'delete'
  })

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
  const { data } = await request({
    url: `${INTERFACE_PREFIX}/changeStatus`,
    method: 'put',
    data: {
      id,
      status
    }
  })

  return data
}
