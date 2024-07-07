/**
 * 密码加密及比较操作··
 */
import bcrypt from 'bcrypt'

/**
 * 加密 password
 */
export function encryptPassword(password: string): Promise<string> {
  // 加密数据的开销
  const saltRounds = 10
  return new Promise((resolve, reject) => {
    bcrypt
      .hash(password, saltRounds)
      .then((hash: string) => {
        return resolve(hash)
      })
      .catch(e => {
        return reject(e)
      })
  })
}

/**
 * 匹配密码
 */
export async function comparePassword(
  pwd1: string,
  pwd2: string
): Promise<boolean> {
  return await bcrypt.compare(pwd1, pwd2)
}
