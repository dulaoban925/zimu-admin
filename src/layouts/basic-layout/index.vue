<template>
  <component :is="Wrapper">
    <common-content />
  </component>
  <common-face />
</template>
<script setup lang="ts">
import CommonContent from '../common/content/index.vue'
import CommonFace from '../common/face/index.vue'
import { LAYOUT_PROVIDE_KEY } from './constants'
import Wrapper from './horizontal-layout/index.vue'
import { useMenuStore } from '@/store'

defineOptions({
  name: 'Layout'
})

const menuStore = useMenuStore()

const menus = computed(() => menuStore.authMenus)
const activeMenu = computed(() => menuStore.activeMenu)

provide(LAYOUT_PROVIDE_KEY, {
  menus,
  activeMenu
})
</script>
