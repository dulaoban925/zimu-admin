<!--
  菜单类型选择器
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
import { MENU_TYPE_DESC } from '@/constants'

defineOptions({
  name: 'MenuTypeSelector'
})

const value = defineModel({ type: String })

defineProps({
  placeholder: String
})

// 类型选项
const typeOptions = Object.entries(MENU_TYPE_DESC).map(([value, label]) => ({
  value,
  label
}))
</script>
