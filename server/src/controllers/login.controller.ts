import { Body, Controller, Post } from 'routing-controllers'
import jwt from 'jsonwebtoken'
import { comparePassword } from '../utils/pwd'
import { error, success } from '../utils/r'
import { JWT_SECRET } from '../constants/secrets'
import { UserService } from '../services/user.service'
import { getRedisInstance } from '../tools/redis'
import { PWD_ERROR_TIMES } from '../constants/redis-keys'

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
      recordPwdErrorTimes(username)
      return error('密码错误，请检查后重试')
    }
  }
}

/**
 * 记录密码错误次数
 * @param username 用户名
 */
async function recordPwdErrorTimes(username: string) {
  // 获取 redis 客户端实例
  const client = getRedisInstance()
  // 获取当前用于已输入错误次数，默认为 0
  let errorTimes = (await client.hGet(PWD_ERROR_TIMES, username)) ?? 0
  // 错误次数加 1
  errorTimes++
  // 更新 redis 中该用户密码错误次数数据
  await client.hSet(PWD_ERROR_TIMES, { [username]: errorTimes })
}
