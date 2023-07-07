/**
 * 加密解密
 */
import Crypto from 'crypto-js'

const SecretKey = '__ZM_CRYPTO_SECRET__'

// 加密
export function encrypt(s: string): string {
  return Crypto.AES.encrypt(s, SecretKey).toString()
}

// 解密
export function decrypt(s: string): string {
  const bytes = Crypto.AES.decrypt(s, SecretKey)

  return bytes.toString(Crypto.enc.Utf8)
}
