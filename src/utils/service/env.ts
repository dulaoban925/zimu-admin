// 系统代理匹配前缀
const PROXY_PATTERN = '/api'

// 获取服务端请求相关配置
export function getEnvServiceConfig() {
  return {
    url: import.meta.env.VITE_SERVICE_URL,
    enableProxy: import.meta.env.VITE_ENABLE_PROXY,
    proxyPattern: PROXY_PATTERN
  }
}
