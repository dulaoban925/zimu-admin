<!--
  性别选择器
-->
<template>
  <base-selector :options="typeOptions" />
</template>

<script setup lang="ts">
import { GENDER_DESC } from '@/constants'
import BaseSelector, { type OptionItem } from '../../base-selector'

defineOptions({
  name: 'GenderSelector'
})

// 类型选项
const typeOptions: OptionItem[] = (
  Object.entries(GENDER_DESC) as [string, string][]
).map(([value, label]) => ({
  value,
  label
}))
</script>
