<!--
  菜单管理
-->
<template>
  <div class="menu-manage">
    <zm-table :table-props="tableProps" :pagination-props="paginationProps">
      <zm-table-column
        prop="code"
        label="菜单编码"
        filterable
        min-width="180"
      />
      <zm-table-column
        prop="name"
        label="菜单名称"
        filterable
        min-width="180"
      />
      <zm-table-column
        prop="typeText"
        label="类型"
        filterable
        min-width="120"
      />
      <zm-table-column label="图标" min-width="60">
        <template #default="{ row: { icon } }">
          <el-icon size="18"><component :is="getIcon(icon)" /></el-icon>
        </template>
      </zm-table-column>
      <zm-table-column prop="level" label="层级" min-width="60" />
      <zm-table-column prop="sort" label="排序" min-width="60" />
      <zm-table-column prop="sort" label="状态" min-width="80" />
      <zm-table-column fixed="right" label="操作" min-width="180">
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
import { getIcon } from '@/utils/icons'
import { isEnable } from '@/utils/is'
import { getList } from './api'

const tableProps = reactive({
  data: []
})

const paginationProps = reactive({
  total: 0,
  currentPage: 1,
  pageSize: 10
})

onBeforeMount(() => {
  getList(paginationProps.currentPage, paginationProps.pageSize).then(
    ({ rows, total }: any) => {
      tableProps.data = rows
      paginationProps.total = total
    }
  )
})
</script>

<style scoped></style>
