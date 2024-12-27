<!--
  基础选择器

  支持素有 el-select 属性，sel-select 作为第一个元素，外部传入的属性会透传到 el-select 上
-->
<template>
  <el-select>
    <el-option
      v-for="o in options"
      :key="o.value"
      :value="o.value"
      :label="o.label"
    />
  </el-select>
</template>

<script setup lang="ts">
import type { OptionItem } from './index'
import type { PropType } from 'vue'

defineOptions({
  name: 'BaseSelector'
})

defineProps({
  // 下拉选项
  options: {
    type: Array as PropType<OptionItem[]>,
    default: () => []
  }
})
</script>
