/**
 * 接口授权验证逻辑
 */
import { JWT_SECRET } from '@constants/secrets'
import { UserService } from '@services/user.service'
import jwt from 'jsonwebtoken'
import type { Action } from 'routing-controllers'

export async function authChecker(action: Action) {
  // 请求头 Authorization 获取 token
  const token = action.request.headers.authorization?.split(' ')[1]
  // 若 token 不存在，不通过
  if (!token) return false

  try {
    // jwt 验证 token 是否有效
    const payload = jwt.verify(token, JWT_SECRET)

    // 验证用户名是否有效
    const username = (payload as jwt.JwtPayload).username
    if (username) {
      const user = await new UserService().queryByUsername(username)
      // 若不存在对应用户，不通过
      if (user) return true
    }
  } catch {
    return false
  }

  return false
}
