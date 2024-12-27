<!--
  是否选择器
-->
<template>
  <base-selector :options="typeOptions" />
</template>

<script setup lang="ts">
import { Y_N_DESC } from '@/constants'
import BaseSelector, { type OptionItem } from '../../base-selector'

defineOptions({
  name: 'YNSelector'
})

// 类型选项
const typeOptions: OptionItem[] = (
  Object.entries(Y_N_DESC) as [string, string][]
).map(([value, label]) => ({
  value,
  label
}))
</script>
