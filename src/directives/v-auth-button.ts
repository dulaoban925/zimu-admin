/**
 * 按钮权限指令
 *
 * v-auth-button="'buttonCode'"
 */
import { useAuthStore } from '@/store/modules/auth'
import type { DirectiveBinding } from 'vue'

function vAuthButton(el: any, binding: DirectiveBinding) {
  const authStore = useAuthStore()
  const bindingButtonCode = binding.value as string

  el.style.display = authStore.authButtonCodes.includes(bindingButtonCode)
    ? ''
    : 'none'
}

// eslint-disable-next-line import/no-default-export
export default vAuthButton
