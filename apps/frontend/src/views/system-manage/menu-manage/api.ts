/**
 * 菜单管理接口请求集合
 */
import { request, type Nullable, type ValueOf } from '@/utils'
import { objectToQueryString } from '@/utils/normal'
import type { ACTIVATION_STATUS } from '@/constants'
import type { MenuItem } from './types'

const INTERFACE_PREFIX = '/menu'

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
): Promise<ZiMuInterface.QueryListByPageResponse<MenuItem>> {
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
export async function getDetail(id: string): Promise<Nullable<MenuItem>> {
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
export async function save(menu: MenuItem): Promise<MenuItem> {
  const { data } = await request.post(`${INTERFACE_PREFIX}/save`, {
    data: menu
  })

  return data
}

/**
 * 删除
 * @param id id
 * @returns
 */
export async function del(id: number): Promise<MenuItem> {
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
): Promise<MenuItem> {
  const { data } = await request.put(`${INTERFACE_PREFIX}/changeStatus`, {
    data: {
      id,
      status
    }
  })

  return data
}
