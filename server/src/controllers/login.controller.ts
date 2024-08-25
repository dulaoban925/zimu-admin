import { CURRENT_USER, PWD_ERROR_TIMES } from '@constants/redis-keys'
import { JWT_SECRET } from '@constants/secrets'
import { UserService } from '@services/user.service'
import { comparePassword } from '@utils/pwd'
import { error, success } from '@utils/r'
import { hGet, hSet } from '@utils/redis'
import jwt from 'jsonwebtoken'
import { Body, Controller, Post } from 'routing-controllers'

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

      // 缓存当前用户
      hSet(CURRENT_USER, user)
      // 重置密码错误次数
      recordPwdErrorTimes(username, true)

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
async function recordPwdErrorTimes(username: string, reset: boolean = false) {
  if (reset) {
    // 重置密码错误次数
    await hSet(PWD_ERROR_TIMES, {
      [username]: 0
    })
    return
  }
  // 获取当前用于已输入错误次数，默认为 0
  let errorTimes: number =
    ((await hGet(PWD_ERROR_TIMES, username)) as number) ?? 0
  // 错误次数加 1
  errorTimes++
  // 更新 redis 中该用户密码错误次数数据
  await hSet(PWD_ERROR_TIMES, { [username]: errorTimes })
}
