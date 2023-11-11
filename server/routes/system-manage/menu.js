const express = require('express')
const router = express.Router()
const successReturn = require('../../handlers/response').successReturn

/* GET users listing. */
router.get('/list', function (req, res, next) {
  const responseJson = [
    {
      code: 'Dashboard',
      label: '控制台',
      icon: 'Odometer',
      sort: 1,
      type: 'menu',
      level: 1
    },
    {
      code: 'Home',
      label: '主页',
      sort: 1,
      type: 'menu',
      level: 2,
      parent: 'Dashboard'
    },
    {
      code: 'SystemManage',
      label: '系统管理',
      icon: 'Setting',
      sort: 1,
      type: 'menu',
      level: 1
    },
    {
      code: 'UserManage',
      label: '用户管理',
      sort: 1,
      type: 'menu',
      level: 2,
      parent: 'SystemManage'
    },
    {
      code: 'MenuManage',
      label: '菜单管理',
      sort: 2,
      type: 'menu',
      level: 2,
      parent: 'SystemManage'
    },
    {
      code: 'AuthManage',
      label: '权限管理',
      sort: 3,
      type: 'menu',
      level: 2,
      parent: 'SystemManage'
    },
    {
      code: 'RoleManage',
      label: '角色管理',
      sort: 4,
      type: 'menu',
      level: 2,
      parent: 'SystemManage'
    }
  ]
  res.status(200).send(successReturn(responseJson))
})

module.exports = router
