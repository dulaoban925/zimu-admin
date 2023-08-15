<template>
  <div class="zm-table__filter">
    <slot>
      <zm-query-form :items="formItems" />
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import ZmQueryForm from './query-form/query-form.vue'
import type { QueryFormItemType } from './query-form/types'

defineOptions({
  name: 'ZmTableFilter'
})

defineProps({
  // 筛选表单对象列表
  formItems: Array as PropType<QueryFormItemType[]>
})
</script>

<style scoped></style>
