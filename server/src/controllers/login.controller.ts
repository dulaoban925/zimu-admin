import { Body, Controller, Post } from 'routing-controllers'
import jwt from 'jsonwebtoken'
import { comparePassword } from '../utils/pwd'
import { error, success } from '../utils/r'
import { JWT_SECRET } from '../constants/secrets'
import { UserService } from '../services/user.service'

/**
 * 登录 controller
 */
@Controller()
export class LoginController {
  // 用户服务
  userService = new UserService()

  /**
   * 登录接口
   * @param body 请求体
   */
  @Post('/login')
  async login(@Body() body: any) {
    const { username, password } = body
    if (!username || !password) {
      return error('用户名和密码不允许为空')
    }

    // 校验用户是否存在
    const user = await this.userService.queryByUsername(username)
    if (!user) {
      return error('用户不存在')
    }

    // 验证用户名和密码是否正确
    const isPwdSame = await comparePassword(password, user.password)
    if (isPwdSame) {
      // 生成 jwt
      const token = jwt.sign({ username }, JWT_SECRET, {
        expiresIn: 60 * 60
      })

      return success({
        token
      })
    } else {
      return error('密码错误，请检查后重试')
    }
  }
}
