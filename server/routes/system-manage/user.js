const express = require('express')
const router = express.Router()
const successReturn = require('../../handlers/response').successReturn

/* GET users listing. */
router.get('/list', function (req, res, next) {
  const responseJson = [
    {
      name: 'Tom',
      jobNumber: '123123123',
      sex: '男',
      tel: '139xxxx5507'
    },
    {
      name: 'Jerry',
      jobNumber: '124124124',
      sex: '女',
      tel: '139xxxx5507'
    }
  ]
  res.status(200).send(successReturn(responseJson))
})

module.exports = router
