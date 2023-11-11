<template>
  <div class="menu-manage">
    <zm-table :table-props="tableProps">
      <zm-table-column prop="code" label="编码" width="180" filterable />
      <zm-table-column prop="label" label="名称" width="180" filterable />
      <zm-table-column prop="type" label="类型" filterable />
      <zm-table-column prop="path" label="路径" />
      <zm-table-column prop="icon" label="图标" />
      <zm-table-column prop="level" label="层级" filterable />
      <zm-table-column prop="sort" label="排序" />
    </zm-table>
  </div>
</template>

<script setup lang="ts">
import { getList } from './api'

const tableProps = reactive({
  data: []
})

onBeforeMount(() => {
  getList().then((res: any) => {
    tableProps.data = res
  })
})
</script>

<style scoped></style>
