<template>
  <!-- 操作按钮 -->
  <!-- <el-col :span="colSpan"> -->
  <div ref="actionsRef" :class="bem.e('operations')">
    <el-button
      v-if="showCollapseBtn"
      link
      type="primary"
      :size="size"
      @click="handleChangeCollapse"
    >
      <span>{{ collapseBtnText }}</span>
      <el-icon>
        <component :is="collapseBtnIcon" />
      </el-icon>
    </el-button>
    <slot name="operations">
      <el-button :size="size" @click="handleReset">{{
        resetButtonText
      }}</el-button>
      <el-button type="primary" :size="size" @click="handleSearch">{{
        searchButtonText
      }}</el-button>
    </slot>
  </div>
  <!-- </el-col> -->
</template>

<script setup lang="ts">
import { ArrowDown, ArrowUp } from '@zimu/icons'
import { useBem } from '@/hooks/use-bem'
import { EVENT_NAMES } from '../constants'
import { COLLAPSE_BUTTON_TEXT } from './constants'

defineOptions({
  name: 'ZmFilterFormActions'
})

type Props = {
  collapsed?: boolean
  showCollapseBtn?: boolean
  colSpan?: number
  size?: string
  resetButtonText?: string
  searchButtonText?: string
}

const {
  collapsed,
  showCollapseBtn = true,
  size = 'default',
  resetButtonText = '重置',
  searchButtonText = '查询'
} = defineProps<Props>()
const emit = defineEmits([
  EVENT_NAMES.FILTER_RESET,
  EVENT_NAMES.FILTER_SEARCH,
  EVENT_NAMES.CHANGE_COLLAPSED
])

const bem = useBem('zm-filter-form')
const actionsRef = useTemplateRef<HTMLDivElement>('actionsRef')

const collapseBtnText = computed(() =>
  collapsed ? COLLAPSE_BUTTON_TEXT.EXPAND : COLLAPSE_BUTTON_TEXT.COLLAPSE
)
const collapseBtnIcon = computed(() => (collapsed ? ArrowDown : ArrowUp))

// 切换展开状态
const handleChangeCollapse = () => {
  emit(EVENT_NAMES.CHANGE_COLLAPSED)
}

const handleReset = () => {
  emit(EVENT_NAMES.FILTER_RESET)
}

const handleSearch = () => {
  emit(EVENT_NAMES.FILTER_SEARCH)
}

defineExpose({
  actionsRef: computed(() => actionsRef.value)
})
</script>

<style scoped></style>
