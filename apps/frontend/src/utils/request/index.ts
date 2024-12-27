import { getEnvServiceConfig } from '../service/env'
import { createRequest } from './creators'

const { url, enableProxy, proxyPattern } = getEnvServiceConfig()

const config = { baseURL: enableProxy ? proxyPattern : url }
export const request = createRequest(config)
