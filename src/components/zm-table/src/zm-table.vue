<template>
  <div class="zm-table">
    <!-- 筛选 -->
    <zm-table-filter
      v-if="showFilter"
      :form-items="filterFormItems"
      v-bind="filterFormProps"
      @[FilterResetEvent]="handleFilterReset"
      @[FilterSearchEvent]="handleFilterSearch"
    >
      <slot name="filter" />
    </zm-table-filter>
    <!-- 表体 -->
    <div class="zm-table__content">
      <div
        :class="{
          'zm-table__content-operation': true,
          'zm-table__content-split-operation':
            slots.leftOperation || slots.rightOperation
        }"
      >
        <slot name="operation">
          <div class="zm-table__content-split-operation-part">
            <slot name="leftOperation" />
          </div>
          <div class="zm-table__content-split-operation-part">
            <slot name="rightOperation" />
          </div>
        </slot>
      </div>
      <el-table
        class="zm-table__content-table"
        v-bind="fullTableProps"
        v-on="tableEvents"
      >
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
import { ElPagination, ElTable } from 'element-plus'
import {
  DEFAULT_FILTER_FORM_PROPS,
  DEFAULT_PAGINATION_PROPS,
  DEFAULT_TABLE_PROPS,
  EVENT_NAMES
} from './constants'
import { useFilterEvents } from './hooks'
import { generateFormItemsByColumns } from './query-form/form-item/generators'
import ZmTableFilter from './table-filter.vue'
import ZmTablePagination from './table-pagination.vue'
import type { QueryFormItemType } from './query-form/types'
// eslint-disable-next-line no-duplicate-imports
import type { FormProps, PaginationProps, TableProps } from 'element-plus'
import type { Component, VNode } from 'vue'

defineOptions({
  name: 'ZmTable'
})

const props = defineProps({
  // 表格列是否可配置
  columnConfigurable: {
    type: Boolean,
    default: true
  },
  // 是否分页
  pageable: {
    type: Boolean,
    default: true
  },
  // 表格属性
  tableProps: {
    type: Object as PropType<TableProps<any>>,
    default: () => ({ ...DEFAULT_TABLE_PROPS })
  },
  // 分页器属性
  paginationProps: {
    type: Object as PropType<PaginationProps>,
    default: () => ({ ...DEFAULT_PAGINATION_PROPS })
  },
  // 筛选表单属性
  filterFormProps: {
    type: Object as PropType<FormProps>,
    default: () => ({ ...DEFAULT_FILTER_FORM_PROPS })
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
  ...[EVENT_NAMES.FILTER_RESET, EVENT_NAMES.FILTER_SEARCH]
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

const slots = useSlots()

/**
 * 计算过滤可用的表格列。
 * @returns - 过滤可用的表格列。
 */
const filterableColumns = computed(() =>
  slots
    ?.default?.()
    ?.filter(
      (s: VNode) =>
        (s.type as Component).name === 'ZmTableColumn' &&
        s.props?.filterable !== false
    )
)

/**
 * 是否展示筛选模块
 * 1.存在 filter slot
 * 2.默认插槽中设置有 ZmTableColumn 设置了 filterable 属性，且不为 false
 */
const showFilter = computed(
  () => slots.filter || !!(slots.default && !!filterableColumns.value?.length)
)

// 筛选表单对象列表
const filterFormItems = ref<QueryFormItemType[]>([])

/**
 * 当显示过滤器时，更新过滤表单项目。
 */
watchEffect(() => {
  if (showFilter.value) {
    filterFormItems.value = generateFormItemsByColumns(filterableColumns.value)
  }
})

const {
  FilterResetEvent,
  FilterSearchEvent,
  handleFilterReset,
  handleFilterSearch
} = useFilterEvents(emit)
</script>

<style lang="scss" scoped>
@use '../style/zm-table.scss' as *;
</style>
