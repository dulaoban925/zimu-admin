<template>
  <div :class="bem.b()" :style="{ 'justify-content': justifyContent }">
    <el-pagination v-bind="attrs" />
  </div>
</template>

<script setup lang="ts">
import { ElPagination } from 'element-plus'
import { useBem } from '@/hooks/use-bem'

defineOptions({
  name: 'ZmTablePagination',
  inheritAttrs: false
})

defineProps({
  // 横向定位
  justifyContent: {
    type: String as PropType<'flex-start' | 'center' | 'flex-end'>,
    default: 'flex-end'
  }
})

const bem = useBem('zm-table-pagination')

const attrs: Record<string, any> = useAttrs()
</script>

<style scoped lang="scss">
@use '../style/zm-table.scss' as *;
</style>
