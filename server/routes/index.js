const express = require('express')
const router = express.Router()

const SystemRouter = require('./system-manage')

// 请求 url 通用部分
const COMMON_URL_BASE = '/api'

// 安装路由
const setupRouter = app => {
  router.use(SystemRouter)
  app.use(COMMON_URL_BASE, router)
}

module.exports = setupRouter
