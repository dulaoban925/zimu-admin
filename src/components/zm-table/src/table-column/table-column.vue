<template>
  <el-table-column v-bind="attrs">
    <template v-if="slots.default" #default="scope">
      <slot v-bind="scope" />
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import { ElTableColumn } from 'element-plus'
import type { QueryFormItemType } from '../query-form/types'

defineOptions({
  name: 'ZmTableColumn'
})

interface Props {
  filterable?: boolean | QueryFormItemType
}

withDefaults(defineProps<Props>(), {
  filterable: false
})

const attrs = useAttrs()
const slots = useSlots()
</script>
