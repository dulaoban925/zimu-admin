<!--
  左导航菜单
-->
<template>
  <div class="horizontal-sidebar">
    <zm-menu
      :data="menus"
      :default-active="activeMenu"
      index-key="code"
      show-common-used
      show-collect
      @select="handleMenuSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { LAYOUT_PROVIDE_KEY } from '@/layouts/basic-layout/constants'
import type { LayoutProvide } from '@/layouts/basic-layout/types'

defineOptions({
  name: 'HorizontalLayoutSidebar'
})

const _router = useRouter()

const { menus, activeMenu } = inject<LayoutProvide>(LAYOUT_PROVIDE_KEY, {})

const handleMenuSelect = (index: string) => {
  _router.push({ name: index })
}
</script>

<style scoped></style>
