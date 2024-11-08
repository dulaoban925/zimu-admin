/**
 * 权限管理接口请求集合
 */
import {
  getLeafMenus,
  transformFlatMenusToTree
} from '@/store/modules/menu/helpers'
import { request, type Nullable, type ValueOf } from '@/utils'
import { objectToQueryString } from '@/utils/normal'
import type { ACTIVATION_STATUS } from '@/constants'
import type { AuthItem } from './types'

// 接口前缀
const INTERFACE_PREFIX = '/auth'

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
): Promise<AuthItem[]> {
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
export async function getDetail(id: string): Promise<Nullable<AuthItem>> {
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
export async function save(user: AuthItem): Promise<AuthItem> {
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
export async function del(id: number): Promise<AuthItem> {
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
): Promise<AuthItem> {
  const { data } = await request.put(`${INTERFACE_PREFIX}/changeStatus`, {
    data: {
      id,
      status
    }
  })

  return data
}

/**
 * 获取树形结构菜单
 */
export async function getMenuTree() {
  const {
    data: { rows }
  } = await request.get('/menu/list')

  if (!rows.length) return []
  const result = transformFlatMenusToTree(rows)
  return result
}

/**
 * 获取当前权限已分配的菜单
 */
export async function getDistributedMenuList(authId: number) {
  const { data } = await request.get(
    `${INTERFACE_PREFIX}/distributedMenus?id=${authId}`
  )
  return getLeafMenus(data)
}

/**
 * 分配菜单
 */
export async function distribute(auth: AuthItem) {
  const { data } = await request.post(`${INTERFACE_PREFIX}/distribute`, {
    data: auth
  })
  return data
}
