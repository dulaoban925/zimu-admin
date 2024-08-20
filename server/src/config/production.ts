/* eslint-disable import/no-default-export */
const productionEnvConfigs = {
  // 数据库配置
  db: {
    host: '10.121.1.13' // 主机地址
  },
  // Redis 配置
  redis: {
    url: 'redis://root:admin0125@10.121.1.13:6379'
  }
}

export default productionEnvConfigs
