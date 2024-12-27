<!--
  跳转类型选择器
-->
<template>
  <base-selector :options="typeOptions" />
</template>

<script setup lang="ts">
import { MENU_NAVIGATE_TYPE_DESC } from '@/constants'

defineOptions({
  name: 'ActivationStatusSelector'
})

// 类型选项
const typeOptions: { value: string; label: string }[] = (
  Object.entries(MENU_NAVIGATE_TYPE_DESC) as [string, string][]
).map(([value, label]) => ({
  value,
  label
}))
</script>
