<template>
  <component :is="Wrapper">
    <common-content />
  </component>
  <common-face />
</template>

<script setup lang="ts">
import { useAuthStore, useMenuStore } from '@/store'
import CommonContent from '../common/content/index.vue'
import CommonFace from '../common/face/index.vue'
import { LAYOUT_PROVIDE_KEY } from './constants'
import Wrapper from './horizontal-layout/index.vue'

defineOptions({
  name: 'Layout'
})

const menuStore = useMenuStore()
const authStore = useAuthStore()

const menus = computed(() => authStore.authMenus)
const activeMenu = computed(() => menuStore.activeMenu)

provide(LAYOUT_PROVIDE_KEY, {
  menus,
  activeMenu
})
</script>
