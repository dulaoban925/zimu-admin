// 通用接口请求路径，用于添加到 controller 请求函数上
export const INTERFACE_PATH = {
  LIST: '/list', // 全量列表
  LIST_BY_PAGE: '/listByPage', // 分页列表
  BY_ID: '/:id',
  QUERY_BY_ID: '/query/:id', // 查询详情
  INSERT: '/insert', // 新增
  UPDATE: '/update', // 更新
  UPSERT: '/upsert', // 保存
  SOFT_DELETE_BY_ID: '/soft/:id', // 软删除
  CHANGE_STATUS: '/changeStatus' // 变更状态
}
