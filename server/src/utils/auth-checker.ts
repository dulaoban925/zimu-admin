/**
 * 接口授权验证逻辑
 */
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '@constants/secrets'
import { UserService } from '@services/user.service'
import type { Action } from 'routing-controllers'

export default function authChecker(action: Action, roles: string[]) {
  // 请求头 Authorization 获取 token
  const token = action.request.headers.authorization?.split(' ')[1]
  // 若 token 不存在，不通过
  if (!token) return false

  // jwt 验证 token 是否有效
  jwt.verify(token, JWT_SECRET, (err: any, payload: any) => {
    // 若 error 存在，不通过
    if (err) {
      return false
    }

    // 验证用户名是否有效
    const username = payload.username
    const user = new UserService().queryByUsername(username)
    // 若不存在对应用户，不通过
    if (!user) return false
  })
  return true
}
