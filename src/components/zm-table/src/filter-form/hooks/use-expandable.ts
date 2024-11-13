/**
 * 操作收起展开
 * @returns
 */

type Options = {
  showCollapseBtn: boolean
  collapsedRows: number
}
export function useExpandable({ showCollapseBtn, collapsedRows = 1 }: Options) {
  /**
   * 操作栏占位大小
   * 当操作栏独占一行时，= 24
   * 当操 n-1个表单宽度 < 作栏宽度 < n个表单项款度，= 单个表单项宽度 * （n）
   */
  const actionsColSpan = ref(24)
  const actionsWidth = ref(0)
  const wrapperRef = useTemplateRef<HTMLElement>('wrapperRef')
  const actionsRef = useTemplateRef<{
    actionsRef: HTMLElement
  }>('actionsRef')
  // 需要展示的行号和列数量映射，如第一行需要展示3列，则 shownRowColMapping.value = {1: 3}
  const shownRowColMapping = ref<Record<number, number>>({})
  // 是否已经计算过
  const isCalculated = ref(false)

  // 收起时需要展示的子元素的索引
  const shownItemIndexes = computed(() => {
    const mapping = shownRowColMapping.value
    let maxItem = 0
    for (let index = 1; index <= collapsedRows; index++) {
      maxItem += mapping?.[index] ?? 0
    }
    // 由于操作栏需要占一栏，所以 maxItem - 1
    return maxItem - 1 || 1
  })

  async function calculate() {
    // 若不需要展开/收起按钮，则无需计算
    if (!showCollapseBtn) return
    await nextTick()
    // 若无容器组件，无需计算，因为表单元素定位是相对于容易元素的
    if (!wrapperRef.value) return
    // 操作栏子元素列表
    const actionsChildren = Array.from(
      actionsRef.value?.actionsRef?.children ?? []
    )
    // 操作栏宽度 = 所有子元素宽度想加
    actionsWidth.value = actionsChildren.reduce((total, item) => {
      return total + (item as HTMLElement).getBoundingClientRect().width
    }, 0)
    // 容器子元素列表，即 form-item 列表
    const container = wrapperRef.value
    const formItems = Array.from(container?.children ?? [])
    const containerStyles = window.getComputedStyle(container)
    // 容器行高，返回数组结构，如 ['50px', '50px']
    const rowHeights = containerStyles
      .getPropertyValue('grid-template-rows')
      .split(' ')
    const containerRect = container?.getBoundingClientRect()

    /**
     *
     */
    for (const item of formItems) {
      // item rect
      const itemRect = item.getBoundingClientRect()
      // 子元素相对容器的顶部距离
      const itemTop = itemRect.top - containerRect.top
      // 子元素在容器的第几行
      let rowStart = 0
      let cumulativeHeight = 0

      for (const [i, rowHeight] of rowHeights.entries()) {
        cumulativeHeight += Number.parseFloat(rowHeight)
        // 若子元素与容器的距离小于容器行高，则表示在当前行展示，i 从 0 开始，所以rowStart = i+1
        if (itemTop < cumulativeHeight) {
          rowStart = i + 1
          break
        }
      }
      // 若 rowStart > collapsedRows，说明当前行已经超出了收起的行数，无需展示
      if (rowStart > collapsedRows) {
        return
      }
      shownRowColMapping.value[rowStart] =
        (shownRowColMapping.value[rowStart] ?? 0) + 1
      isCalculated.value = true
    }
  }

  onMounted(() => {
    calculate()
  })

  return {
    actionsColSpan,
    wrapperRef,
    actionsRef,
    shownItemIndexes,
    isCalculated
  }
}
