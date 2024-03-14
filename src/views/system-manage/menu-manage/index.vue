<!--
  菜单管理
-->
<template>
  <div class="menu-manage">
    <zm-table :table-props="tableProps">
      <zm-table-column
        prop="code"
        label="菜单编码"
        filterable
        min-width="180"
      />
      <zm-table-column
        prop="label"
        label="菜单名称"
        filterable
        min-width="180"
      />
      <zm-table-column prop="type" label="类型" filterable min-width="120" />
      <zm-table-column prop="icon" label="图标" min-width="120" />
      <zm-table-column prop="level" label="层级" filterable min-width="60" />
      <zm-table-column prop="sort" label="排序" min-width="60" />
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

onBeforeMount(() => {
  getList().then((res: any) => {
    tableProps.data = res
  })
})
</script>

<style scoped></style>
