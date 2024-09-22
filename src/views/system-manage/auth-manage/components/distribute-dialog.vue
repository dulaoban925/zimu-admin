<!--
  编辑弹窗，可操作：新增、编辑
-->
<template>
  <zm-popper
    v-model="visible"
    title="分配资源"
    width="35%"
    destroy-on-close
    @opened="handleOpened"
    @confirm="handleConfirm"
  >
    <el-input
      v-model="filterText"
      style="width: 240px"
      placeholder="请输入菜单编码/名称进行筛选"
      @change="handleFilterChange"
    />
    <el-tree
      ref="tree"
      :data="menuTreeData"
      node-key="id"
      show-checkbox
      :default-checked-keys="treeDefaultCheckedKeys"
      default-expand-all
      :props="treeProps"
      :filter-node-method="filterNodeMethod"
      @check="handleTreeCheck"
    />
  </zm-popper>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { useTemplateRef } from 'vue'
import { PAGE_OPERATION } from '@/constants'
import type { ValueOf } from '@/utils'
import { getMenuTree } from '../api'

defineOptions({
  name: 'AuthDistributeDialog'
})

const { authId } = defineProps({
  // 弹窗操作，默认新增
  operation: {
    type: String as PropType<ValueOf<typeof PAGE_OPERATION>>,
    default: PAGE_OPERATION.EDIT
  },
  // 权限 id
  authId: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['distribute'])

// 弹窗显隐
const visible = defineModel({ type: Boolean, default: false })
// 筛选数据
const filterText = ref('')
// ElTree ref
const treeRef = useTemplateRef('tree')
// 菜单树形结构数据
const menuTreeData = ref([])
// ElTree Props
const treeProps = {
  label: 'name'
}
// ElTree 默认勾选的 key
const treeDefaultCheckedKeys = ref([])
// 勾选的菜单id
const checkedMenuIds = ref<number[]>([])
// ElTree 节点筛选函数
const filterNodeMethod = (value: string, data: Record<string, string>) => {
  if (!value) return true
  return data.name.includes(value) || data.code.includes(value)
}

// 勾选菜单
const handleTreeCheck = (
  data: Record<string, string>,
  { checkedKeys, halfCheckedKeys }
) => {
  checkedMenuIds.value = [...new Set([...checkedKeys, halfCheckedKeys])]
}

// 初始化
const init = async () => {
  // 获取所有菜单
  menuTreeData.value = await getMenuTree()
}

const handleOpened = () => {
  init()
}

// 搜索
const handleFilterChange = (val: string) => {
  treeRef.value?.filter(val)
}

const handleConfirm = () => {
  emit('distribute', authId, checkedMenuIds.value)
}
</script>

<style lang="scss" scoped></style>
