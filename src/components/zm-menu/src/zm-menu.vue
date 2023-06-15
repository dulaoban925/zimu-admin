<!--
  左侧导航菜单
  @anchor SuperYing
  @date 2023/04/17 11:02:52
 -->
<template>
  <div
    :class="{
      'zm-menu': true,
      'is-collapse': collapse
    }"
    :style="{
      backgroundColor: backgroundColor ?? 'var(--el-menu-bg-color)'
    }"
  >
    <zm-menu-toolbar
      :collapse="collapse"
      :show-common-used="showCommonUsed"
      :show-collect="showCollect"
      @collapse="handleCollapse"
    />
    <zm-menu-filter
      v-show="!collapse"
      :menu-options="filterOptions"
      @select-change="handleFilter"
      @input-input="handleFilterInputInput"
    />
    <zm-menu-content
      :data="data"
      :collapse="collapse"
      :menu-trigger="menuTrigger"
      :filter-input-value="filterState.inputValue"
      :default-active="defaultActive"
      :background-color="backgroundColor"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
    />
  </div>
</template>
<script setup lang="ts">
import type { NavigationFailure } from 'vue-router'
import type { ZmMenuItemClicked, ZmMenuDataItem, FilterParams } from '../types'
import { MENU_TRIGGER } from '../constants'
import { checkIndexPath } from './zm-menu'
import { isString, isObject, isArray } from '@vue/shared'
import { isBoolean } from '@/utils'
import ZmMenuToolbar from './toolbar.vue'
import ZmMenuFilter from './filter.vue'
import ZmMenuContent from './content'
import { debounce } from 'lodash-es'

const props = defineProps({
  // 菜单数据
  data: {
    type: Array as PropType<ZmMenuDataItem[]>,
    default: () => []
  },
  // 折叠
  collapse: {
    type: Boolean,
    default: false
  },
  // 是否可收藏 ，控制顶部收藏按钮及菜单收藏功能
  showCollect: {
    type: Boolean,
    default: false
  },
  // 收藏的菜单
  collectedData: {
    type: Array as PropType<ZmMenuDataItem[]>,
    default: () => []
  },
  // 是否开启常用菜单标识
  showCommonUsed: {
    type: Boolean,
    default: false
  },
  // 常用菜单
  commonUsedData: {
    type: Array as PropType<ZmMenuDataItem[]>,
    default: () => []
  },
  // 菜单触发方式
  menuTrigger: {
    type: String,
    values: Object.values(MENU_TRIGGER),
    default: MENU_TRIGGER.CLICK
  },
  // 默认激活的菜单index
  defaultActive: String,
  backgroundColor: String
})

const emit = defineEmits({
  // sub-menu 展开事件
  open: (index: string, indexPath: string[]) =>
    isString(index) && checkIndexPath(indexPath),
  // sub-menu 关闭事件
  close: (index: string, indexPath: string[]) =>
    isString(index) && checkIndexPath(indexPath),
  // 选中菜单
  select: (
    index: string,
    indexPath: string[],
    item: ZmMenuItemClicked,
    routerResult?: Promise<void | NavigationFailure>
  ) =>
    isString(index) &&
    checkIndexPath(indexPath) &&
    isObject(item) &&
    (routerResult === undefined || routerResult instanceof Promise),
  // 收藏
  collect: (item: ZmMenuDataItem, menuData: Array<ZmMenuDataItem>) =>
    isObject(item) && isArray(menuData),
  // 导航菜单收起状态变更事件
  collapseChange: (collapseFlag: boolean) => isBoolean(collapseFlag)
})

const collapse = ref(props.collapse)
const data = ref(props.data)
const { menuTrigger, showCollect, showCommonUsed } = toRefs(props)

watchEffect(() => {
  collapse.value = props.collapse
  data.value = props.data
})

// 删选组件-下拉框选项，仅去第一层菜单
const filterOptions = computed(
  () =>
    props.data.reduce((ret: ZmMenuDataItem[], item: ZmMenuDataItem) => {
      const { index, label } = item
      ret.push({ index, label })
      return ret
    }, []) ?? []
)

// 收起
const handleCollapse = (collapsed: boolean) => {
  collapse.value = collapsed
  emit('collapseChange', collapsed)
}

/** filter start */
const filterState = reactive<any>({})
// 根据 value 匹配菜单数据
const matchMenus = (value: string, menus: Array<ZmMenuDataItem>) => {
  const result: Array<ZmMenuDataItem> = []
  if (!menus || !menus.length) return []
  else {
    menus.forEach(menu => {
      if (menu.children && menu.children.length) {
        const childResult = matchMenus(value, menu.children)
        if (childResult && childResult.length) {
          const item = {
            ...menu,
            children: childResult
          }
          result.push(item)
        }
      } else {
        if (menu.label.indexOf(value) > -1) {
          result.push(menu)
        }
      }
    })
  }
  return result
}

const handleFilter = ({ selectValue, inputValue }: FilterParams) => {
  const baseMenus = selectValue
    ? props.data.filter(menu => menu.index === selectValue)
    : props.data
  if (inputValue) {
    filterState.inputValue = inputValue
    data.value = matchMenus(inputValue, baseMenus)
  } else {
    filterState.inputValue = ''
    data.value = baseMenus
  }
}

const handleFilterInputInput = debounce(({ selectValue, inputValue }) => {
  handleFilter({ selectValue, inputValue })
}, 500)
/** filter end */

/** content start */
const handleOpen = (index: string, indexPath: string[]) => {
  emit('open', index, indexPath)
}

const handleClose = (index: string, indexPath: string[]) => {
  emit('close', index, indexPath)
}
// 选中菜单
const handleSelect = (
  index: string,
  indexPath: string[],
  item: ZmMenuItemClicked,
  routerResult?: Promise<void | NavigationFailure>
) => {
  emit('select', index, indexPath, item, routerResult)
}
/** content end */
</script>
<style lang="scss">
@import '../style/zm-menu.scss';
</style>
