<!--
  员工在职状态选择器
-->
<template>
  <base-selector :options="typeOptions" />
</template>

<script setup lang="ts">
import { EMPLOYEE_STATUS_DESC } from '@/constants'
import BaseSelector, { type OptionItem } from '../../base-selector'

defineOptions({
  name: 'EmployeeStatusSelector'
})

// 类型选项
const typeOptions: OptionItem[] = (
  Object.entries(EMPLOYEE_STATUS_DESC) as [string, string][]
).map(([value, label]) => ({
  value,
  label
}))
</script>
