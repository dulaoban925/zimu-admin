<template>
  <div class="menu-manage">
    <zm-table
      :table-props="tableProps"
      @size-change="handleSizeChange"
      @filter-reset="handleFilterReset"
      @filter-search="handleFilterSearch"
    >
      <zm-table-column prop="name" label="姓名" width="180" filterable />
      <zm-table-column prop="jobNumber" label="工号" width="180" filterable />
      <zm-table-column prop="sex" label="性别" width="180" filterable />
      <zm-table-column prop="tel" label="手机号" />
    </zm-table>
  </div>
</template>

<script setup lang="ts">
import { getList } from './api'
const tableProps = reactive({
  data: []
})

function handleSizeChange(val: number) {
  console.log('handleSizeChange', val)
}

const handleFilterReset = () => {
  console.log('handleFilterReset')
}

const handleFilterSearch = (val: any) => {
  console.log('handleSizeChange', val)
}

onBeforeMount(() => {
  getList().then((res: any) => {
    tableProps.data = res
  })
})
</script>

<style scoped></style>
