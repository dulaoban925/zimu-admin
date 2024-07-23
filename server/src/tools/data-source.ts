import path from 'path'
import { DataSource } from 'typeorm'
import { get } from '@tools/env-config'

const dbConfig = get('db')

const dataSource = new DataSource({
  ...dbConfig,
  entities: [path.join(__dirname, '../entities/*.entity.{js,ts}')], // typeorm 实体
  entityPrefix: 'zm-', // 数据库表前缀
  logging: true // 开启日志
})

export default dataSource
