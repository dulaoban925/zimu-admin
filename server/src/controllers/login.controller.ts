import { CURRENT_USER, PWD_ERROR_TIMES } from '@constants/redis-keys'
import { JWT_SECRET } from '@constants/secrets'
import { User } from '@entities/user.entity'
import { UserService } from '@services/user.service'
import { comparePassword, encryptPassword } from '@utils/pwd'
import { error, success } from '@utils/r'
import { hGet, hSet, set } from '@utils/redis'
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

    // 验证用户名和密码是否正确
    const { user, isSamePwd } = await this.checkUser(username, password)

    if (!user) {
      return error('用户不存在')
    }

    if (isSamePwd) {
      // 生成 jwt
      const token = jwt.sign({ username }, JWT_SECRET, {
        expiresIn: 60 * 60
      })

      // 缓存当前用户
      set(CURRENT_USER, username)
      // 重置密码错误次数
      await recordPwdErrorTimes(username, true)

      return {
        token
      }
    } else {
      await recordPwdErrorTimes(username)
      return error('密码错误，请检查后重试')
    }
  }

  @Post('/resetPassword')
  async resetPassword(
    @Body()
    body: {
      username: string
      originPassword: string
      newPassword: string
    }
  ) {
    const { username, originPassword, newPassword } = body

    // 数据判断
    if (!username || !originPassword || !newPassword) {
      return error('用户名、原密码和新密码不允许为空')
    }
    // 检查原密码是否匹配
    const { user, isSamePwd: isOriginPwdMatch } = await this.checkUser(
      username,
      originPassword
    )
    if (!user) {
      return error('用户不存在')
    }

    if (!isOriginPwdMatch) {
      return error('原密码不正确')
    }

    // 加密妈妈
    const newPasswordHash = await encryptPassword(newPassword)
    // 更新用户密码
    await this.userService.updatePassword(username, newPasswordHash)

    return true
  }

  async checkUser(username: string, password: string) {
    // 校验用户是否存在
    const user = await this.userService.queryByUsername(username)
    if (!user) {
      return {
        user: null
      }
    }

    // 验证用户名和密码是否正确
    const isSamePwd = await comparePassword(password, user.password)

    return {
      user,
      isSamePwd
    }
  }
}

/**
 * 记录密码错误次数
 * @param username 用户名
 */
async function recordPwdErrorTimes(username: string, reset: boolean = false) {
  // 获取当前用于已输入错误次数，默认为 0
  let errorTimes: number =
    ((await hGet(PWD_ERROR_TIMES, username)) as number) ?? 0

  if (reset) {
    // 重置密码错误次数
    errorTimes > 0 &&
      (await hSet(PWD_ERROR_TIMES, {
        [username]: 0
      }))
  } else {
    // 错误次数加 1
    errorTimes++
    // 更新 redis 中该用户密码错误次数数据
    await hSet(PWD_ERROR_TIMES, { [username]: errorTimes })
  }
}
