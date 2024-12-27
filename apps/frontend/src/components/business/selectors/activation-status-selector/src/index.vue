<!--
  启用状态选择器
-->
<template>
  <base-selector :options="typeOptions" />
</template>

<script setup lang="ts">
import { ACTIVATION_STATUS_DESC } from '@/constants'
import BaseSelector, { type OptionItem } from '../../base-selector'

defineOptions({
  name: 'ActivationStatusSelector'
})

// 类型选项
const typeOptions: OptionItem[] = (
  Object.entries(ACTIVATION_STATUS_DESC) as [string, string][]
).map(([value, label]) => ({
  value,
  label
}))
</script>
