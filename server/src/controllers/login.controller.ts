import { Body, Controller, Post } from 'routing-controllers'
import jwt from 'jsonwebtoken'
import { comparePassword } from '../utils/pwd'
import { error } from '../utils/r'
import { JWT_SECRET } from '../constants/secrets'
import { UserService } from '../services/user.service'

/**
 * 登录 controller
 */

@Controller()
export class LoginController {
  // 用户
  userService = new UserService()

  @Post('/login')
  async login(@Body() body: any) {
    console.log(body)
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

      return token
    } else {
      return error('密码错误，请检查后重试')
    }
  }
}
