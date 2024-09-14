<!--
  启用状态选择器
-->
<template>
  <el-select v-model="value" :placeholder="placeholder">
    <el-option
      v-for="o in typeOptions"
      :key="o.value"
      :value="o.value"
      :label="o.label"
    />
  </el-select>
</template>

<script setup lang="ts">
import { ACTIVATION_STATUS_DESC } from '@/constants'

defineOptions({
  name: 'ActivationStatusSelector'
})

const value = defineModel({ type: String })

defineProps({
  placeholder: String
})

// 类型选项
const typeOptions = Object.entries(ACTIVATION_STATUS_DESC).map(
  ([value, label]) => ({
    value,
    label
  })
)
</script>
