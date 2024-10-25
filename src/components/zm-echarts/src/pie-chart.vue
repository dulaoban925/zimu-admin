<!-- 饼图 -->
<template>
  <zm-chart-container>
    <div ref="domRef" class="pie-chart" :style="chartStyle" />
  </zm-chart-container>
</template>

<script setup lang="ts">
import { isNumber, merge } from 'lodash-es'
import { useEcharts, type ECOption } from '@/hooks'
import { ZmChartContainer } from './container'

defineOptions({
  name: 'ZmPieChart'
})

type Props = {
  options: ECOption
  chartHeight: string | number
}

const { options = {}, chartHeight } = defineProps<Props>()

const formatSize = (size: number | string) => {
  if (!size) return 'inherit'
  if (!isNumber(size) && size.endsWith('px')) return size
  return `${size}px`
}

const chartStyle = computed(() => ({
  height: formatSize(chartHeight)
}))

const defaultOptions = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Pie Chart',
      type: 'pie',
      radius: '50%',
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}

const chartOptions = computed(() => merge({}, defaultOptions, options))

const { domRef } = useEcharts(chartOptions)
</script>

<style scoped></style>
