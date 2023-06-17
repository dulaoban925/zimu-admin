<!--
  左侧导航菜单-操作栏
  @anchor SuperYing
  @date 2023/04/17 11:08:38
 -->
<template>
  <div
    :class="{
      'zm-menu__toolbar': true,
      'is-collapse': collapse
    }"
  >
    <div v-show="!collapse">
      <el-tooltip
        v-for="action in toolbarActions"
        :key="action.key"
        placement="top"
      >
        <template #content>{{ action.tip }}</template>
        <el-icon
          size="15px"
          color="#FFF"
          :class="[
            'zm-menu__icon',
            activeAction === action.key
              ? 'zm-menu__icon--active'
              : 'zm-menu__icon--inactive'
          ]"
          @click="handleActionClick(action)"
        >
          <component :is="action.icon" />
        </el-icon>
      </el-tooltip>
    </div>
    <el-icon
      size="15px"
      class="zm-menu__icon zm-menu__icon--collapse"
      @click="handleCollapsed"
      @mouseenter="tooltipVisible = true"
      @mouseleave="tooltipVisible = false"
    >
      <component :is="collapse ? Expand : Fold" />
    </el-icon>
  </div>
</template>
<script setup lang="ts">
import { TOOLBAR_OPTION } from '../constants'
import type { ActionItem } from '../types'
import { Expand, Fold, Menu, HomeFilled } from '@element-plus/icons'
import { StartFilled } from '@zimu/icons'

defineOptions({
  name: 'ZmMenuToolbar'
})

const props = defineProps({
  activeAction: {
    type: String,
    default: TOOLBAR_OPTION.HOME
  },
  // 是否收起
  collapse: Boolean,
  // 是否展示常用
  showCommonUsed: Boolean,
  // 是否展示收藏
  showCollect: Boolean
})

const emit = defineEmits(['action-click', 'collapse'])

const tooltipVisible = ref(false)

const collapse = ref(props.collapse)
const activeAction = ref(props.activeAction)

watchEffect(() => {
  collapse.value = props.collapse
  activeAction.value = props.activeAction
})

// 操作列表
const ToolList = computed<ActionItem[]>(() => [
  {
    tip: '默认',
    key: TOOLBAR_OPTION.HOME,
    icon: markRaw(HomeFilled),
    visible: true
  },
  {
    tip: '常用',
    key: TOOLBAR_OPTION.COMMON,
    icon: markRaw(Menu),
    visible: props.showCommonUsed
  },
  {
    tip: '收藏',
    key: TOOLBAR_OPTION.COLLECT,
    icon: markRaw(StartFilled),
    visible: props.showCollect
  }
])

const toolbarActions = computed(() =>
  ToolList.value.filter(({ visible }) => visible)
)

const handleActionClick = (action: ActionItem) => {
  activeAction.value = action.key
  emit('action-click', action)
}

const handleCollapsed = () => {
  toggleCollapse(!collapse.value)
}

// 触发菜单展开/收起
const toggleCollapse = (status: boolean) => {
  if (collapse.value === status) return
  tooltipVisible.value = false
  collapse.value = status
  emit('collapse', collapse.value)
}
</script>
