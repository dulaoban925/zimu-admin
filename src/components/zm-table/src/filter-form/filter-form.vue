<template>
  <div :class="bem.b()">
    <el-form
      ref="filterForm"
      :model="innerModel"
      v-bind="attrs"
      :style="{ height: `${containerHeight}px` }"
    >
      <div ref="wrapperRef" :class="bem.e('container')">
        <slot>
          <zm-filter-form-item
            v-for="item in computedItems"
            :key="item.uid"
            v-bind="item"
            v-model="innerModel[item.tagProps!.modelKey]"
          />
        </slot>
        <zm-filter-form-actions
          ref="actionsRef"
          :collapsed="innerCollapsed"
          :show-collapse-btn="showCollapseBtn"
          :size="size"
          :reset-button-text="resetButtonText"
          :search-button-text="searchButtonText"
          @[EVENT_NAMES.FILTER_RESET]="handleReset"
          @[EVENT_NAMES.FILTER_SEARCH]="handleSearch"
          @[EVENT_NAMES.CHANGE_COLLAPSED]="handleChangeCollapsed"
        />
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useBem } from '@/hooks/use-bem'
import { EVENT_NAMES } from '../constants'
import { useFilterEvents } from '../hooks/use-filter-events'
import ZmFilterFormActions from './form-actions.vue'
import { ZmFilterFormItem } from './form-item/form-item'
import { useExpandable } from './hooks/use-expandable'
import type { FilterFormItemType } from './types'
import type { ElForm, FormProps } from 'element-plus'

defineOptions({
  name: 'ZmFilterForm',
  inheritAttrs: false
})

interface Props {
  items: FilterFormItemType[] // 表单项
  collapsedRows?: number // 收起后展示的行数
  collapsed?: boolean // 是否收起状态
  showCollapseBtn?: boolean // 是否展示展开/收起按钮
  resetButtonText?: string // 重置按钮文本
  searchButtonText?: string // 搜索按钮文本
}

const {
  items = [],
  collapsedRows = 1,
  collapsed = true,
  showCollapseBtn = true,
  resetButtonText,
  searchButtonText
} = defineProps<Props>()

const emit = defineEmits([
  EVENT_NAMES.FILTER_RESET,
  EVENT_NAMES.FILTER_SEARCH,
  EVENT_NAMES.CHANGE_COLLAPSED
])

const computedItems = computed(() => {
  return items.map((item, index) => {
    const hidden =
      // 折叠状态 & 显示折叠按钮 & 当前索引大于保留索引
      showCollapseBtn && formCollapsed.value && shownItemIndexes.value
        ? shownItemIndexes.value <= index
        : false

    return {
      ...item,
      class: hidden ? 'hidden' : ''
    }
  })
})

const attrs: FormProps = useAttrs() as FormProps
const bem = useBem('zm-filter-form')

const {
  wrapperRef,
  actionsRef,
  containerHeight,
  shownItemIndexes,
  isCalculated
} = useExpandable({
  showCollapseBtn,
  collapsedRows
})

// component size
const size = computed(() => attrs.size ?? 'default')
// form model
const innerModel = ref<any>({})
// 内部变量，若组件引用方不传递 collapsed 属性，实现自控制
const innerCollapsed = ref(true)
// 表单是否收起
const formCollapsed = computed(() => innerCollapsed.value && isCalculated.value)

watch(containerHeight, val => {
  console.log('🚀 ~ watch ~ val:', val)
})

const { handleFilterReset, handleFilterSearch } = useFilterEvents(emit)

const handleReset = () => {
  innerModel.value = {}
  handleFilterReset()
}

const handleSearch = () => {
  handleFilterSearch(innerModel.value)
}

watchEffect(() => {
  innerCollapsed.value = collapsed
})

const handleChangeCollapsed = () => {
  innerCollapsed.value = !innerCollapsed.value
  emit(EVENT_NAMES.CHANGE_COLLAPSED, innerCollapsed.value)
}

const formRef = useTemplateRef<typeof ElForm>('filterForm')

defineExpose({
  ...formRef.value
})

watch(
  () => attrs.model,
  val => {
    innerModel.value = val ?? {}
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<style lang="scss">
@use '../../style/zm-table.scss' as *;
</style>
