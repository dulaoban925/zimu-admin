<!--
  表格主题内容
-->
<template>
  <card-wrapper :card="card" :card-props="cardProps" :class="bem.b()">
    <div
      :class="[
        bem.e('operation-bar'),
        splitOperationBar ? bem.e('split-operation-bar') : ''
      ]"
    >
      <!-- 分栏操作栏 -->
      <template v-if="splitOperationBar">
        <div :class="bem.e('split-operation-part')">
          <slot name="operationBarLeft" />
        </div>
        <div :class="bem.e('split-operation-part')">
          <slot name="operationBarRight" />
        </div>
      </template>
      <slot v-else name="operationBar" />
    </div>
    <el-table :class="bem.e('table')" v-bind="attrs">
      <slot />
      <template #append>
        <slot name="append" />
      </template>
      <template #empty>
        <slot name="empty">
          <el-empty description="暂无数据" />
        </slot>
      </template>
    </el-table>
    <!-- 分页器 -->
    <!-- <zm-table-pagination
      v-if="enablePagination"
      ref="zm-pagination"
      v-bind="elPaginationProps"
      v-on="elPaginationEvents"
    >
      <slot name="pagination" />
    </zm-table-pagination> -->
  </card-wrapper>
</template>

<script setup lang="ts">
import { useBem } from '@/hooks'
import { OPERATION_BAR_SLOTS } from './constants'
import { CardWrapper } from './wrapper'
import type { CardProps } from 'element-plus'

defineOptions({
  name: 'ZmTableContent',
  inheritAttrs: false
})

type Props = {
  card?: boolean
  cardProps?: CardProps
}

const { card, cardProps } = defineProps<Props>()

const attrs = useAttrs()
const slots = useSlots()
const bem = useBem('zm-table-content')

// 操作栏是否分栏
const splitOperationBar = computed(
  () =>
    slots[OPERATION_BAR_SLOTS.OPERATION_BAR_LEFT] ||
    slots[OPERATION_BAR_SLOTS.OPERATION_BAR_RIGHT]
)
</script>

<style lang="scss" scoped>
@use '../style/zm-table.scss' as *;
</style>
