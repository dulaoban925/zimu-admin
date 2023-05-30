<!--
  左导航菜单
-->
<template>
  <div class="horizontal-sidebar">
    <zm-menu :data="menus" show-common-used show-collect />
  </div>
</template>

<script setup lang="ts">
import { LAYOUT_PROVIDE_KEY } from '@/layouts/constants'
import { LayoutProvide } from '@/layouts/types'

const { menus } = inject<LayoutProvide>(LAYOUT_PROVIDE_KEY, {})
</script>

<style scoped></style>
