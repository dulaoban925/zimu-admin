import path from 'node:path'
import ds from '@tools/data-source'
import { initRedis } from '@tools/redis'
import authChecker from '@utils/auth-checker'
import { json, urlencoded } from 'body-parser'
import express from 'express'
import { useExpressServer } from 'routing-controllers'
import '@tools/env-config'
import 'module-alias/register'

// 初始化数据库
ds.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((error: any) => {
    console.log('Error during Data Source initialization:', error)
  })

// 初始化 redis
initRedis()

const app = express()

// body 解析相关中间件
// 解析 json 格式
app.use(json())
// 解析 urlencoded body
// 会在 request 对象上挂载 body 属性，包含解析后的数据。
// 这个新的 body 对象包含 key-value 键值对，若设置 extended 为 true，则键值可以是任意类型，否则只能是字符串或数组。
app.use(urlencoded({ extended: true }))

// 将当前实例注册到 routing-controllers
useExpressServer(app, {
  routePrefix: '/api', // 接口统一前缀
  controllers: [path.join(__dirname, './controllers/*.controller.ts')],
  middlewares: [path.join(__dirname, './middlewares/*.global.ts')],
  interceptors: [path.join(__dirname, './interceptors/*.global.ts')],
  authorizationChecker: authChecker
})

// 启动服务，监听 3000 端口
const PORT = 3000
app.listen(PORT, () => {
  console.log(`  App is running at http://localhost:${PORT}\n`)
  console.log('  Press CTRL-C to stop\n')
})
