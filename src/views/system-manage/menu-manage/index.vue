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
      <zm-table-column prop="parent" label="父菜单编码" min-width="180" />
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
          <zm-button link type="primary" @click="handleEdit(row.id)">
            编辑
          </zm-button>
          <zm-button
            link
            type="danger"
            need-confirm
            :pop-confirm-props="{
              title: '确认删除？'
            }"
            @confirm="handleDelConfirm(row.id)"
          >
            删除
          </zm-button>
          <zm-button
            link
            type="primary"
            need-confirm
            :pop-confirm-props="{
              title: `确认${getStatusText(row.status)}？`
            }"
            @confirm="handleChangeStatusConfirm(row)"
          >
            {{ getStatusText(row.status) }}
          </zm-button>
        </template>
      </zm-table-column>
      <template #rightOperation>
        <el-button type="primary" @click="handleAdd">新增</el-button>
      </template>
    </zm-table>

    <edit-dialog
      v-model="dialogVisible"
      v-bind="dialogProps"
      @saved="handleSaved"
    />
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ACTIVATION_STATUS, PAGE_OPERATION } from '@/constants'
import { getIcon } from '@/utils/icons'
import { isEnable } from '@/utils/is'
import { changeStatus, del, getList } from './api'
import editDialog from './components/edit-dialog.vue'
import { MenuItem } from './types'

const tableProps = reactive({
  data: []
})

const paginationProps = reactive({
  total: 0,
  currentPage: 1,
  pageSize: 10
})

onBeforeMount(() => {
  init()
})

// 弹窗显隐
const dialogVisible = ref(false)
// dialog props
const dialogProps = reactive<{
  operation?: string
  menuId?: string
}>({})

const init = (page = 1, pageSize = 10) => {
  getList(page, pageSize).then(({ rows, total }: any) => {
    tableProps.data = rows
    paginationProps.total = total
  })
}

// 新增
const handleAdd = () => {
  Object.assign(dialogProps, {
    menuId: '',
    operation: PAGE_OPERATION.NEW
  })
  dialogVisible.value = true
}

// 编辑
const handleEdit = (id: string) => {
  Object.assign(dialogProps, {
    menuId: id,
    operation: PAGE_OPERATION.EDIT
  })
  dialogVisible.value = true
}

// 保存回调
const handleSaved = () => {
  init(paginationProps.currentPage, paginationProps.pageSize)
}

// 确认删除
const handleDelConfirm = (id: number) => {
  del(id).then(() => {
    ElMessage.success('删除成功')
    init(paginationProps.currentPage, paginationProps.pageSize)
  })
}

// 停用/启用描述
const getStatusText = (status: string) => {
  return isEnable(status) ? '停用' : '启用'
}

/**
 * 启用/停用
 */
const handleChangeStatusConfirm = ({
  id,
  status
}: {
  id: number
  status: string
}) => {
  const newStatus = isEnable(status)
    ? ACTIVATION_STATUS.DEACTIVATED
    : ACTIVATION_STATUS.ACTIVATED

  changeStatus(id, newStatus).then(() => {
    ElMessage.success(`${getStatusText(status)}成功`)
    init(paginationProps.currentPage, paginationProps.pageSize)
  })
}
</script>

<style scoped></style>
