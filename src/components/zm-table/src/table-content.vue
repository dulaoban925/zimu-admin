<!--
  表格主题内容
-->
<template>
  <div :class="bem.b()">
    <div
      :class="[
        bem.e('operation-bar'),
        splitOperationBar ? bem.e('split-operation-bar') : ''
      ]"
    >
      <!-- 分栏操作栏 -->
      <template v-if="splitOperationBar">
        <div :class="bem.e('split-operation-part')">
          <slot name="leftOperation" />
        </div>
        <div :class="bem.e('split-operation-part')">
          <slot name="rightOperation" />
        </div>
      </template>
      <slot v-else name="operation" />
    </div>
    <el-table :class="bem.e('table')" v-bind="attrs">
      <slot />
      <slot name="append" />
      <slot name="empty" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { useBem } from '@/hooks'
import { OPERATION_BAR_SLOTS } from './constants'

defineOptions({
  name: 'ZmTableContent',
  inheritAttrs: false
})

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
