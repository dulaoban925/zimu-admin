/**
 * echarts hooks
 */
import { useElementSize } from '@vueuse/core'
import * as echarts from 'echarts'
import {
  BarChart,
  LineChart,
  // 系列类型的定义后缀都为 SeriesOption
  type BarSeriesOption,
  type LineSeriesOption
} from 'echarts/charts'
import {
  // 数据集组件
  DatasetComponent,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
  type DatasetComponentOption,
  type GridComponentOption,
  type TitleComponentOption,
  type TooltipComponentOption
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import type { Nullable } from '@/utils'
import type { ComposeOption } from 'echarts/core'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])

export function useEcharts(
  options: ComputedRef<ECOption> | Ref<ECOption>,
  renderFn?: (chartInstance: echarts.ECharts) => void
) {
  // 渲染图表的元素
  const domRef = ref(null)
  // echarts 实例
  let chart: Nullable<echarts.ECharts> = null
  const initialSize = { width: 0, height: 0 }
  const { width, height } = useElementSize(domRef, initialSize)

  // 是否可以渲染图表
  const canRender = () => {
    return width.value > 0 && height.value > 0
  }

  // 是否已渲染过
  const isRendered = () => {
    return domRef.value && chart
  }

  // 更新选人
  const updateRender = (options: ECOption) => {
    if (isRendered()) chart?.clear()
    chart?.setOption(options)
  }

  // 更新尺寸
  const resizeRender = () => {
    chart?.resize()
  }

  // 渲染函数
  const render = () => {
    if (!domRef.value) return
    // TODO: 切换主题
    chart = echarts.init(domRef.value)
    if (renderFn) renderFn(chart)
    updateRender(options.value)
  }

  // 销毁实例
  function destroy() {
    chart?.dispose()
  }

  // 响应式
  const scope = effectScope()
  scope.run(() => {
    watch([width, height], () => {
      // 若 dom 宽高不满足渲染条件，则置空 chart 实例
      if (!canRender()) {
        chart = null
        return
      }
      // 若图表已渲染过，则重置图表尺寸
      if (isRendered()) {
        resizeRender()
        return
      }
      // 渲染图表
      render()
    })
    watch(
      options,
      newOptions => {
        updateRender(newOptions)
      },
      {
        deep: true
      }
    )
  })
  onScopeDispose(() => {
    destroy()
    scope.stop()
  })

  return {
    domRef
  }
}
