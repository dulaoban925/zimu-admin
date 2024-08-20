import path from 'node:path'
import { get } from '@tools/env-config'
import { DataSource } from 'typeorm'
// eslint-disable-next-line no-duplicate-imports
import type { DataSourceOptions } from 'typeorm'

let dataSource: DataSource

// 获取 dataSource 实例
export function getDataSourceInstance() {
  console.log('getDataSourceInstance', dataSource)
  if (dataSource) return dataSource
  const dbConfig: DataSourceOptions = get('db') as DataSourceOptions
  dataSource = new DataSource({
    ...dbConfig,
    entities: [path.join(__dirname, '../entities/*.entity.{js,ts}')], // typeorm 实体
    entityPrefix: 'zm-', // 数据库表前缀
    logging: true // 开启日志
  })
  return dataSource
}

// 初始化 datasource
export function initDataSource() {
  // 初始化数据库
  getDataSourceInstance()
    .initialize()
    .then(() => {
      console.log('Data Source has been initialized!')
    })
    .catch((error: any) => {
      console.log('Error during Data Source initialization:', error)
    })
}
