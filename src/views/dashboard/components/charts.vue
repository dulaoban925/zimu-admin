<template>
  <div class="charts">
    <el-row gutter="10">
      <el-col :span="14"
        ><zm-line-chart chart-height="360px" :options="lineChartOptions"
      /></el-col>
      <el-col :span="10"
        ><zm-pie-chart chart-height="360px" :options="pieChartOptions"
      /></el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
const pieChartOptions = ref({
  title: {
    text: '用户分布',
    left: 'center'
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  series: [
    {
      name: '用户分布',
      data: [
        { value: 1048, name: '男' },
        { value: 735, name: '女' },
        { value: 580, name: '未知' }
      ]
    }
  ]
})

const lineChartOptions = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['访问量', '注册量']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '访问量',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '注册量',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    }
  ]
})
</script>
