import { getEnvServiceConfig } from './env'
import { createRequest } from './factory'

// 是否启用代理
const enableProxy = import.meta.env.VITE_ENABLE_PROXY

const { url, proxyPattern } = getEnvServiceConfig()

const config = { baseURL: enableProxy ? proxyPattern : url }
export const request = createRequest(config)

export * from './env'
