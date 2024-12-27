<!-- 饼图 -->
<template>
  <zm-chart-container>
    <div ref="domRef" class="line-chart" :style="chartStyle" />
  </zm-chart-container>
</template>

<script setup lang="ts">
import { merge } from 'lodash-es'
import { useEcharts, type ECOption } from '@/hooks'
import { ZmChartContainer } from './container'
import { formatSize } from './helpers'

defineOptions({
  name: 'ZmLineChart'
})

type Props = {
  options: ECOption
  chartHeight: string | number
}

const { options = {}, chartHeight } = defineProps<Props>()

const chartStyle = computed(() => ({
  height: formatSize(chartHeight)
}))

const defaultOptions = {
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [],
      type: 'line'
    }
  ]
}

const chartOptions = computed(() => merge({}, defaultOptions, options))

const { domRef } = useEcharts(chartOptions)
</script>

<style scoped></style>
