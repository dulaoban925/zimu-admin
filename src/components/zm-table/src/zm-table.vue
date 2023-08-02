<template>
  <div class="zm-table">
    <!-- 筛选 -->
    <zm-table-filter />
    <!-- 表体 -->
    <div class="zm-table__content">
      <div class="zm-table__content-operation"></div>
      <el-table v-bind="fullTableProps" v-on="tableEvents">
        <slot />
      </el-table>
    </div>
    <!-- 分页器 -->
    <zm-table-pagination
      v-if="pageable"
      v-bind="fullPaginationProps"
      :events="paginationEvents"
    />
  </div>
</template>

<script setup lang="ts">
import type { TableProps, PaginationProps } from 'element-plus'
import { ElTable, ElPagination } from 'element-plus'
import { DEFAULT_TABLE_PROPS, DEFAULT_PAGINATION_PROPS } from './constants'
import ZmTablePagination from './zm-table-pagination.vue'
import ZmTableFilter from './zm-table-filter.vue'

defineOptions({
  name: 'ZmTable'
})

const props = defineProps({
  columnConfigurable: {
    type: Boolean,
    default: true
  },
  pageable: {
    type: Boolean,
    default: true
  },
  tableProps: {
    type: Object as PropType<TableProps<any>>,
    default: () => ({ ...DEFAULT_TABLE_PROPS })
  },
  paginationProps: {
    type: Object as PropType<PaginationProps>,
    default: () => ({ ...DEFAULT_PAGINATION_PROPS })
  }
})

const fullTableProps = computed(() =>
  Object.assign({}, DEFAULT_TABLE_PROPS, props.tableProps)
)
const fullPaginationProps = computed(() =>
  Object.assign({}, DEFAULT_PAGINATION_PROPS, props.paginationProps)
)

const emit = defineEmits([
  ...Object.keys(ElTable.emits ?? {}),
  ...Object.keys(ElPagination.emits ?? {}),
  ...[]
])

const tableEvents: Record<string, (...args: any[]) => void> = {}
const tableEventKeys: string[] = Object.keys(ElTable.emits ?? {})
for (const key of tableEventKeys) {
  tableEvents[key] = function (...args: any[]) {
    emit(key, ...args)
  }
}

const paginationEvents: Record<string, (...args: any[]) => void> = {}
const paginationEventsKeys: string[] = Object.keys(ElPagination.emits ?? {})
for (const key of paginationEventsKeys) {
  paginationEvents[key] = function (...args: any[]) {
    emit(key, ...args)
  }
}
</script>

<style lang="scss" scoped>
@use '../style/zm-table.scss' as *;
</style>
