/**
 * 用户 store
 */
import { getUserInfo as requestUserInfo } from '@/apis'

type UserInfo = {
  username: string
}

export const useUserStore = defineStore('user-store', () => {
  // 用户所有信息
  const userInfo = ref<UserInfo>()

  // 用户名
  const username = computed(() => userInfo.value?.username ?? '')

  // 获取用户信息
  async function getUserInfo(username: string) {
    const info = await requestUserInfo(username)
    userInfo.value = info
  }

  return {
    /** state start */
    userInfo,
    username,
    /** state end */
    /** action start */
    getUserInfo
    /** action end */
  }
})
