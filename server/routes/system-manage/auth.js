const express = require('express')
const router = express.Router()
const successReturn = require('../../handlers/response').successReturn

/* GET users listing. */
router.get('/list', function (req, res, next) {
  const responseJson = [{ code: 'admin', label: '管理员权限' }]
  res.status(200).send(successReturn(responseJson))
})

module.exports = router
