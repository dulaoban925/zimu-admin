<template>
  <el-table-column v-bind="{ ...props, ...attrs }">
    <template v-if="slots.default" #default="scope">
      <slot v-bind="scope" />
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import { ElTableColumn } from 'element-plus'
import type { FilterFormItemType } from '../filter-form/types'

defineOptions({
  name: 'ZmTableColumn'
})

interface Props {
  filterable?: boolean | FilterFormItemType
  showOverflowTooltip?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  filterable: false,
  showOverflowTooltip: true
})

const attrs = useAttrs()
const slots = useSlots()
</script>
