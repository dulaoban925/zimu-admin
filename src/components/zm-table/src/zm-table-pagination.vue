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
  events: Object as PropType<Record<string, (...args: any[]) => void>>,
  justifyContent: {
    type: String as PropType<'flex-start' | 'center' | 'flex-end'>,
    default: 'flex-end'
  }
})

const attrs = useAttrs()
</script>

<style scoped></style>
