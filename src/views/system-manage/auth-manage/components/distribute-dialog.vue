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
    @closed="handleClosed"
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
import { useTemplateRef } from 'vue'
import type { PAGE_OPERATION } from '@/constants'
import type { ValueOf } from '@/utils'
import type { MenuItem } from '@/views/system-manage/menu-manage/types'
import { getDistributedMenuList, getMenuTree } from '../api'
import type { ElTree } from 'element-plus'

defineOptions({
  name: 'AuthDistributeDialog'
})

type Props = {
  operation?: ValueOf<typeof PAGE_OPERATION>
  authId?: number
}

const { authId } = defineProps<Props>()

const emit = defineEmits(['distribute'])

// 弹窗显隐
const visible = defineModel({ type: Boolean, default: false })
// 筛选数据
const filterText = ref('')
// ElTree ref
const treeRef = useTemplateRef<typeof ElTree>('tree')
// 菜单树形结构数据
const menuTreeData = ref<ZiMuAuth.Menu[]>([])
// ElTree Props
const treeProps = {
  label: 'name'
}
// ElTree 默认勾选的 key
const treeDefaultCheckedKeys = ref<number[]>([])
// 勾选的菜单集合
const checkedMenus = ref<MenuItem[]>([])

// ElTree 节点筛选函数
const filterNodeMethod = (value: string, data: Record<string, string>) => {
  if (!value) return true
  return data.name.includes(value) || data.code.includes(value)
}

// 勾选菜单
const handleTreeCheck = (
  data: Record<string, string>,
  {
    checkedNodes,
    halfCheckedNodes
  }: {
    checkedNodes: MenuItem[]
    halfCheckedNodes: MenuItem[]
  }
) => {
  checkedMenus.value = [...new Set([...checkedNodes, ...halfCheckedNodes])]
}

// 获取当前权限已分配的菜单项并勾选
const initDistributedMenus = () => {
  getDistributedMenuList(authId!).then(data => {
    treeDefaultCheckedKeys.value = data.map((r: ZiMuAuth.Menu) => r.id)
  })
}

// 初始化
const init = async () => {
  initDistributedMenus()
  // 获取所有菜单
  menuTreeData.value = await getMenuTree()
}

const handleOpened = () => {
  init()
}

const handleClosed = () => {
  // 重置勾选的节点
  treeDefaultCheckedKeys.value = []
}

// 搜索
const handleFilterChange = (val: string) => {
  treeRef.value?.filter(val)
}

const handleConfirm = () => {
  emit('distribute', checkedMenus.value)
}
</script>

<style lang="scss" scoped></style>
