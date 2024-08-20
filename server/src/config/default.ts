/* eslint-disable import/no-default-export */
const defaultEnvConfigs = {
  // 数据库配置
  db: {
    type: 'mysql', // 类型
    host: 'localhost', // 主机地址
    port: 3306, // 端口
    username: 'root', // 账号
    password: 'admin0125', // 密码
    database: 'zimuadmin' // 库名
  },
  // Redis 配置
  redis: {
    url: 'redis://localhost:6379'
  }
}

export default defaultEnvConfigs
