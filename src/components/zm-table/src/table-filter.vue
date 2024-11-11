<template>
  <div class="zm-table__filter">
    <slot>
      <zm-filter-form
        :items="formItems"
        @[FilterResetEvent]="handleFilterReset"
        @[FilterSearchEvent]="handleFilterSearch"
      />
    </slot>
  </div>
</template>

<script setup lang="ts">
import { EVENT_NAMES } from './constants'
import ZmFilterForm from './filter-form/filter-form.vue'
import { useFilterEvents } from './hooks/use-filter-events'
import type { QueryFormItemType } from './filter-form/types'
import type { PropType } from 'vue'

defineOptions({
  name: 'ZmTableFilter'
})

defineProps({
  // 筛选表单对象列表
  formItems: Array as PropType<QueryFormItemType[]>
})

const emit = defineEmits([EVENT_NAMES.FILTER_RESET, EVENT_NAMES.FILTER_SEARCH])

const {
  FilterResetEvent,
  FilterSearchEvent,
  handleFilterReset,
  handleFilterSearch
} = useFilterEvents(emit)
</script>

<style scoped></style>
