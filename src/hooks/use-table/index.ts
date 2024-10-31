import { isEmpty } from 'lodash-es'

/**
 * table hook
 */
export type UseTableOptions = {
  initialCurrentPage?: number
  initialPageSize?: number
  initialFilter?: Record<string, any>
  filterFreezeKeys?: string[] // 配置的 filterModel 对象键，不会重置
  autoQuery?: boolean
  onBeforeQuery?: () => Promise<void>
  onAfterQuery?: (res: TableQueryResult) => Promise<void>
}

export type TableQueryResult = {
  rows: any[]
  total: number
}

export function useTable(
  options: ComputedRef<UseTableOptions> | Ref<UseTableOptions> = ref({
    autoQuery: true
  }),
  queryFn: (
    page: number,
    pageSize: number,
    filterModel?: Record<string, any>
  ) => Promise<TableQueryResult>
) {
  const currentPage = ref(1)
  const pageSize = ref(10)
  const filterModel = ref<Record<string, any>>({})
  // 表格数据
  const data = ref<any[]>([])
  // 数据总数
  const total = ref(0)

  function initRefs(options: UseTableOptions) {
    if (options.initialCurrentPage)
      currentPage.value = options.initialCurrentPage
    if (options.initialPageSize) pageSize.value = options.initialPageSize
    if (!isEmpty(options.initialFilter))
      filterModel.value = options.initialFilter
  }
  /**
   * 搜索函数
   */
  async function query() {
    await options.value.onBeforeQuery?.()
    const res = await queryFn(
      currentPage.value,
      pageSize.value,
      filterModel.value
    )
    data.value = res.rows
    total.value = res.total
    options.value.onAfterQuery?.(res)
  }

  /**
   * 筛选重置事件处理函数
   */
  function handleFilterReset(autoQuery = true, freezeKeys?: string[]) {
    // 冻结的 key 不重置
    freezeKeys = freezeKeys ?? options.value.filterFreezeKeys ?? []
    if (freezeKeys.length) {
      for (const key of freezeKeys) {
        delete filterModel.value[key]
      }
    } else {
      filterModel.value = {}
    }
    return autoQuery ? query() : Promise.resolve()
  }

  /**
   * 筛选查询事件处理函数
   */
  function handleFilterSearch(filter: Record<string, any>) {
    filterModel.value = { ...filter }
    return query()
  }

  /**
   * 分页 size-change 事件处理函数
   */
  function handleSizeChange(value: number) {
    pageSize.value = value
    return query()
  }

  /**
   * 分页 current-change 事件处理函数
   */
  function handleCurrentChange(value: number) {
    currentPage.value = value
    return query()
  }

  /**
   * 分页 change 事件处理函数
   */
  function handleChange(cpValue: number, psValue: number) {
    currentPage.value = cpValue
    pageSize.value = psValue
    return query()
  }
  /**
   * 分页 prev-click/next-click 事件处理函数
   */
  function handlePrevOrNextClick(value: number) {
    currentPage.value = value
    return query()
  }

  onBeforeMount(() => {
    options.value.autoQuery && query()
  })

  const scope = effectScope()
  scope.run(() => {
    watch(
      () => options.value,
      newValue => {
        initRefs(newValue)
      },
      { deep: true }
    )
  })
  onScopeDispose(() => {
    scope.stop()
  })

  return {
    currentPage,
    pageSize,
    filterModel,
    data,
    total,
    query,
    handleFilterReset,
    handleFilterSearch,
    handleSizeChange,
    handleCurrentChange,
    handleChange,
    handlePrevOrNextClick
  }
}
