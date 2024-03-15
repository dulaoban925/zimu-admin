<template>
  <div class="menu-manage">
    <zm-table
      :table-props="tableProps"
      @size-change="handleSizeChange"
      @filter-reset="handleFilterReset"
      @filter-search="handleFilterSearch"
    >
      <zm-table-column prop="no" label="工号" filterable min-width="120" />
      <zm-table-column prop="name" label="姓名" filterable min-width="120" />
      <zm-table-column prop="sex" label="性别" filterable min-width="60" />
      <zm-table-column prop="tel" label="手机号" min-width="120" />
      <zm-table-column prop="addr" label="地址" min-width="180" />
      <zm-table-column prop="status" label="状态" min-width="80" />
      <zm-table-column prop="tel" label="手机号" min-width="120" />
      <zm-table-column fixed="right" label="操作" min-width="220">
        <template #default="{ row }">
          <el-button link type="primary">编辑</el-button>
          <el-button link type="danger">删除</el-button>
          <el-button v-if="isEnable(row.status)" link type="primary">
            启用
          </el-button>
          <el-button v-else link type="primary">停用</el-button>
        </template>
      </zm-table-column>
      <template #rightOperation>
        <el-button type="primary">新增</el-button>
      </template>
    </zm-table>
  </div>
</template>

<script setup lang="ts">
import { getList } from './api'
import { isEnable } from '@/utils/is'

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
