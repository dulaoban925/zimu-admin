<template>
  <div
    class="zm-table__pagination"
    :style="{ 'justify-content': justifyContent }"
  >
    <el-pagination v-bind="attrs" v-on="events" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ZmTablePagination'
})

defineProps({
  // ElPagination 事件集合
  events: Object as PropType<Record<string, (...args: any[]) => void>>,
  // 横向定位
  justifyContent: {
    type: String as PropType<'flex-start' | 'center' | 'flex-end'>,
    default: 'flex-end'
  }
})

const attrs = useAttrs()
</script>

<style scoped></style>
