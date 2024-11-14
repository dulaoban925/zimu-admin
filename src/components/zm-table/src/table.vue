<template>
  <div class="zm-table">
    <!-- 筛选 -->
    <zm-table-filter
      v-if="enableFilter"
      ref="zm-filter-form"
      :form-items="filterFormItems"
      v-bind="filterFormProps"
      @[FilterResetEvent]="handleFilterReset"
      @[FilterSearchEvent]="handleFilterSearch"
      @[changeCollapsedEvent]="handleChangeCollapsed"
    >
      <slot name="filter" />
    </zm-table-filter>
    <!-- 表体 -->
    <zm-table-content
      ref="zm-table-content"
      v-bind="elTableProps"
      v-on="elTableEvents"
    >
      <slot />
      <template #append>
        <slot name="append" />
      </template>
      <template #empty>
        <slot name="empty" />
      </template>
      <template #operationBar>
        <slot name="operationBar" />
      </template>
      <template #operationBarLeft>
        <slot name="operationBarLeft" />
      </template>
      <template #operationBarRight>
        <slot name="operationBarRight" />
      </template>
    </zm-table-content>
    <!-- 分页器 -->
    <zm-table-pagination
      v-if="enablePagination"
      ref="zm-pagination"
      v-bind="elPaginationProps"
      v-on="elPaginationEvents"
    >
      <slot name="pagination" />
    </zm-table-pagination>
  </div>
</template>

<script setup lang="ts">
import {
  ElPagination,
  ElTable,
  type FormProps,
  type PaginationProps,
  type TableProps
} from 'element-plus'
import {
  DEFAULT_FILTER_FORM_PROPS,
  DEFAULT_PAGINATION_PROPS,
  DEFAULT_TABLE_PROPS,
  EVENT_NAMES,
  FILTER_FORM_PROPS
} from './constants'
import { generateFormItemsByColumns } from './filter-form/form-item/generators'
import { useFilterEvents } from './hooks/use-filter-events'
import ZmTableContent from './table-content.vue'
import ZmTableFilter from './table-filter.vue'
import ZmTablePagination from './table-pagination.vue'
import type { FilterFormItemType } from './filter-form/types'
import type { Component, VNode } from 'vue'

defineOptions({
  name: 'ZmTable'
})

type Props = {
  columnConfigurable?: boolean // todo: 表格列是否可配置
  enableFilter?: boolean // 是否需要筛选表单
  enablePagination?: boolean // 是否启用分页器
  tableProps: TableProps<any> // el-table props
  paginationProps?: PaginationProps // el-pagination props
  filterFormProps?: FormProps & {
    collapsed?: boolean // filter form 是否收起状态
  } // el-form props
}

const {
  // columnConfigurable = true,
  enableFilter = true,
  enablePagination = true,
  tableProps = DEFAULT_TABLE_PROPS,
  paginationProps = DEFAULT_PAGINATION_PROPS,
  filterFormProps = DEFAULT_FILTER_FORM_PROPS
} = defineProps<Props>()

const emit = defineEmits([
  ...Object.values(ElTable.emits ?? {}),
  ...Object.keys(ElPagination.emits ?? {}).map(
    (key: string) => `pagination-${key}`
  ),
  ...[
    EVENT_NAMES.FILTER_RESET,
    EVENT_NAMES.FILTER_SEARCH,
    EVENT_NAMES.CHANGE_COLLAPSED
  ]
])

const slots = useSlots()
// filter-form ref
const filterFormRef = useTemplateRef('zm-filter-form')
// table-content ref
const tableRef = useTemplateRef('zm-table-content')
// pagination ref
const paginationRef = useTemplateRef('zm-pagination')

// el-table 属性
const elTableProps = computed(() =>
  Object.assign({}, DEFAULT_TABLE_PROPS, tableProps)
)
// el-table 事件
const elTableEvents: Record<string, (...args: any[]) => void> = Object.values(
  ElTable.emits ?? {}
).reduce((ret: Record<string, any>, key: string) => {
  ret[key] = function (...args: any[]) {
    emit(key, ...args)
  }
  return ret
}, {})

// el-pagination 属性
const elPaginationProps = computed(() =>
  Object.assign({}, DEFAULT_PAGINATION_PROPS, paginationProps)
)
const elPaginationEvents: Record<string, (...args: any[]) => void> =
  Object.keys(ElPagination.emits ?? {}).reduce(
    (ret: Record<string, any>, key: string) => {
      ret[key] = function (...args: any[]) {
        emit(`pagination-${key}`, ...args)
      }
      return ret
    },
    {}
  )

/**
 * 计算过滤可用的表格列。
 * todo: 兼容多级表头
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

// 筛选表单对象列表
const filterFormItems = ref<FilterFormItemType[]>([])

/**
 * 当显示过滤器时，更新过滤表单项目。
 */
watchEffect(() => {
  if (enableFilter) {
    filterFormItems.value = generateFormItemsByColumns(filterableColumns.value)
  }
})

const {
  FilterResetEvent,
  FilterSearchEvent,
  changeCollapsedEvent,
  handleFilterReset,
  handleFilterSearch,
  handleChangeCollapsed
} = useFilterEvents(emit)

provide(
  FILTER_FORM_PROPS,
  computed(() => filterFormProps)
)

defineExpose({
  ...tableRef.value,
  ...filterFormRef.value,
  ...paginationRef.value
})
</script>

<style lang="scss" scoped>
@use '../style/zm-table.scss' as *;
</style>
