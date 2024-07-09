/**
 * 创建 request 的工厂
 */
import axios from 'axios'
import { extend, reLogin, removeAuthorization } from './helpers'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  Method,
  InternalAxiosRequestConfig,
  AxiosResponse
} from 'axios'
import { useLocalStorage } from '@/hooks'
import { AUTH_KEY } from '@/constants'

interface ResponseConfig {
  codeKey: string
  dataKey: string
  messageKey: string
  success: (response: Record<string, any>, code: number) => boolean
}

type RequestMethod = Method | string

// 错误提示消息前缀
const MessagePrefix = 'utils/request:'

// const AuthUrlPrefix = '/auth'

const REQUEST_METHOD: Record<string, RequestMethod> = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
}

// 创建 request
export function createRequest(
  axiosConfig: AxiosRequestConfig,
  responseConfig?: ResponseConfig
) {
  const instance: AxiosInstance = createRequestInstance(
    axiosConfig,
    responseConfig
  )

  const request = async (config: AxiosRequestConfig) => {
    // 设置默认请求方法 get
    if (!config.method) config.method = REQUEST_METHOD.GET
    const { url, method, data, params } = config
    if (!url) {
      const error = `${MessagePrefix} 请求 url 必需`
      console.error(error)
      return Promise.reject(new Error(error))
    }

    const needDataConfig = [REQUEST_METHOD.POST, REQUEST_METHOD.PUT].includes(
      method
    )
    const needParamsConfig = [
      REQUEST_METHOD.GET,
      REQUEST_METHOD.DELETE
    ].includes(method)

    if (needDataConfig && params) {
      console.warn(
        `${MessagePrefix} 请求方法 ${method} 与 params, 将被忽略，建议使用 data 代替`
      )
    }
    if (needParamsConfig && data) {
      console.warn(
        `${MessagePrefix} 请求方法 ${method} 与 data, 将被忽略，建议使用 params 代替`
      )
    }

    const result = await instance(config)
    return result
  }

  const createSpecificRequest = (method: RequestMethod) => {
    return (url: string, config: AxiosRequestConfig) => {
      Object.assign(config, { url, method })
      return request(config)
    }
  }

  const getRequest = createSpecificRequest(REQUEST_METHOD.GET)

  const postRequest = createSpecificRequest(REQUEST_METHOD.POST)

  const putRequest = createSpecificRequest(REQUEST_METHOD.PUT)

  const deleteRequest = createSpecificRequest(REQUEST_METHOD.DELETE)

  return extend(request, {
    get: getRequest,
    post: postRequest,
    put: putRequest,
    delete: deleteRequest
  })
}

const defaultResponseConfig: ResponseConfig = {
  codeKey: 'code',
  dataKey: 'data',
  messageKey: 'message',
  success: (response, code) => {
    return !!(code && ((code >= 200 && code < 300) || code === 304))
  }
}

// 创建 request 实例
export function createRequestInstance(
  axiosConfig: AxiosRequestConfig,
  responseConfig?: ResponseConfig
) {
  const instance = axios.create(axiosConfig)

  responseConfig = responseConfig
    ? Object.assign({}, defaultResponseConfig, responseConfig)
    : defaultResponseConfig

  // let isAuthUrl = false

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // 设置是否为授权接口，授权接口不需要传递 token
      // isAuthUrl = config.url!.startsWith(AuthUrlPrefix)

      if (!config.headers) {
        config.headers = {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        } as unknown as AxiosRequestHeaders
      }

      const ls = useLocalStorage()
      const token = ls.get(AUTH_KEY)
      if (token) config.headers.Authorization = `Bearer ${token}`

      return config
    },
    e => {
      return Promise.reject(e)
    }
  )

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      const data = response.data
      const { codeKey, success } = responseConfig!
      const isSuccess = success(data, Number(data[codeKey]))

      if (!isSuccess) {
        // TODO:消息提示
        return Promise.reject(data)
      }

      return data
    },
    e => {
      console.error(e)
      const needLogin = e.response.status === 401
      if (needLogin) {
        // 清空权限相关缓存
        removeAuthorization()
        // 重新登录逻辑
        reLogin()
      }
      return Promise.reject(e)
    }
  )

  return instance
}
