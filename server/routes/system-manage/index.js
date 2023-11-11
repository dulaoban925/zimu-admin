const express = require('express')
const router = express.Router()

const userRouter = require('./user')
const menuRouter = require('./menu')
const roleRouter = require('./role')
const authRouter = require('./auth')

const routers = {
  user: userRouter, // 系统管理-用户路由
  menu: menuRouter, // 系统管理-菜单路由
  role: roleRouter, // 系统管理-角色路由
  auth: authRouter // 系统管理-权限路由
}

for (const k in routers) {
  routers[k] && router.use(`/${k}`, routers[k])
}

module.exports = router
