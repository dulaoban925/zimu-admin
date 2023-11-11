/**
 * 响应结果相关处理函数
 */
function generateReturn(type, data, errorMsg = '', successMsg = '') {
  return {
    code: type === 'success' ? 200 : 500,
    data,
    message: errorMsg || successMsg || '成功'
  }
}

function successReturn(data) {
  return generateReturn('success', data)
}

function failReturn(msg) {
  return generateReturn('fail', null, msg || '请求失败')
}

module.exports = {
  successReturn,
  failReturn
}
