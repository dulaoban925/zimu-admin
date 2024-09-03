<!--
  左侧导航菜单-筛选
  @anchor SuperYing
  @date 2023/04/17 11:08:38
 -->
<template>
  <div class="zm-menu__filter">
    <!-- 下拉框搜索 -->
    <div
      v-show="filterMode === FILTER_MODE.SELECT"
      class="zm-menu__filter--select"
    >
      <el-select
        v-model="filterState.selectValue"
        placeholder="一级菜单"
        @change="handleSelectChange"
      >
        <el-option key="" value="" label="全部" />
        <el-option
          v-for="menu in menuOptions"
          :key="menu.index"
          :value="menu.index"
          :label="menu.name"
        />
      </el-select>
      <el-button :icon="Search" @click="handleSwitchFilterMode" />
    </div>
    <!-- 搜索框搜索 -->
    <el-input
      v-show="filterMode === FILTER_MODE.INPUT"
      v-model="filterState.inputValue"
      placeholder="搜索"
      clearable
      autozm="on"
      @clear="handleInputChange"
      @change="handleInputChange"
      @input="handleInputInput"
    >
      <template #prepend>
        <el-button @click="handleSwitchFilterMode">
          {{ filterState.selectLabel || '全部' }}
        </el-button>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@zimu/icons'
import { reactive, ref, watchEffect, type PropType } from 'vue'
import { FILTER_MODE } from './constants'
import type { ZmMenuDataItem } from './types'

defineOptions({
  name: 'ZmMenuFilter'
})

const props = defineProps({
  menuOptions: {
    type: Array as PropType<ZmMenuDataItem[]>,
    default: () => []
  }
})

const emit = defineEmits(['selectChange', 'inputChange', 'inputInput'])

// 当前筛选模式
const filterMode = ref(FILTER_MODE.SELECT)

// 切换筛选模式
const handleSwitchFilterMode = () => {
  filterMode.value =
    filterMode.value === FILTER_MODE.SELECT
      ? FILTER_MODE.INPUT
      : FILTER_MODE.SELECT
}

// 筛选参数对象
const filterState = reactive({
  selectValue: '',
  selectLabel: '',
  inputValue: ''
})

// 菜单下拉框筛选切换
const handleSelectChange = () => {
  emit('selectChange', filterState)
}

// 菜单输入框筛选变更
const handleInputChange = () => {
  emit('inputChange', filterState)
}

// 菜单输入框筛选输入
const handleInputInput = () => {
  emit('inputInput', filterState)
}

watchEffect(() => {
  filterState.selectLabel = filterState.selectValue
    ? (props.menuOptions.find(menu => menu.index === filterState.selectValue)
        ?.name ?? '')
    : ''
})
</script>
./constants./types
