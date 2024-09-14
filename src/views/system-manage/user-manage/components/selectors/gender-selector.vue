<!--
  性别选择器
-->
<template>
  <el-select v-model="value" :placeholder="placeholder">
    <el-option
      v-for="o in genderOptions"
      :key="o.value"
      :value="o.value"
      :label="o.label"
    />
  </el-select>
</template>

<script setup lang="ts">
import { GENDER_DESC } from '@/constants'

defineOptions({
  name: 'UserGenderSelector'
})

const value = defineModel({ type: String })

defineProps({
  placeholder: String
})

// 类型选项
const genderOptions = Object.entries(GENDER_DESC).map(([value, label]) => ({
  value,
  label
}))
</script>
