<!--
  菜单管理
-->
<template>
  <div class="menu-manage">
    <zm-table
      :table-props="tableProps"
      :pagination-props="paginationProps"
      @filter-search="handleFilterSearch"
      @filter-reset="handleFilterReset"
      @pagination-size-change="handleSizeChange"
      @pagination-current-change="handleCurrentChange"
    >
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
      <zm-table-column prop="typeText" label="类型" min-width="100" />
      <zm-table-column prop="parent" label="父菜单编码" min-width="150" />
      <zm-table-column label="图标" min-width="60">
        <template #default="{ row: { icon } }">
          <el-icon size="18"><component :is="getIcon(icon)" /></el-icon>
        </template>
      </zm-table-column>
      <zm-table-column
        prop="navigateTypeText"
        label="跳转类型"
        min-width="100"
      />
      <zm-table-column prop="path" label="地址 URL" min-width="120" />
      <zm-table-column prop="level" label="层级" min-width="60" />
      <zm-table-column prop="sort" label="排序" min-width="60" />
      <zm-table-column prop="statusText" label="状态" min-width="80">
        <template #default="{ row: { status, statusText } }">
          <el-tag :type="isEnable(status) ? 'primary' : 'danger'">{{
            statusText
          }}</el-tag>
        </template>
      </zm-table-column>
      <zm-table-column fixed="right" label="操作" min-width="180">
        <template #default="{ row }">
          <zm-button
            v-auth-button="AUTH_BUTTON.EDIT"
            link
            type="primary"
            @click="handleEdit(row.id)"
          >
            编辑
          </zm-button>
          <zm-button
            v-auth-button="AUTH_BUTTON.DELETE"
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
            v-auth-button="AUTH_BUTTON.ENABLE"
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
        <el-button
          v-auth-button="AUTH_BUTTON.ADD"
          type="primary"
          @click="handleAdd"
          >新增</el-button
        >
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
import { ACTIVATION_STATUS, AUTH_BUTTON, PAGE_OPERATION } from '@/constants'
import { useTable } from '@/hooks'
import { getIcon } from '@/utils/icons'
import { isEnable } from '@/utils/is'
import type { ValueOf } from '@/utils'
import { changeStatus, del, getList } from './api'
import editDialog from './components/edit-dialog.vue'

defineOptions({
  name: 'MenuManage'
})

const {
  currentPage,
  pageSize,
  total,
  data,
  filterModel,
  handleFilterSearch,
  handleFilterReset,
  handleSizeChange,
  handleCurrentChange
} = useTable(undefined, getList)

const tableProps = computed(() => ({
  data: data.value
}))

const paginationProps = computed(() => ({
  total: total.value,
  currentPage: currentPage.value,
  pageSize: pageSize.value
}))

// 弹窗显隐
const dialogVisible = ref(false)
// dialog props
const dialogProps = reactive<{
  operation?: ValueOf<typeof PAGE_OPERATION>
  menuId?: string
}>({})

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
  handleFilterSearch(filterModel.value)
}

// 确认删除
const handleDelConfirm = (id: number) => {
  del(id).then(() => {
    ElMessage.success('删除成功')
    handleFilterSearch(filterModel.value)
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
    handleFilterSearch(filterModel.value)
  })
}
</script>

<style scoped></style>
