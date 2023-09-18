<template>
  <div class="zm-table__filter">
    <slot>
      <zm-query-form
        :items="formItems"
        @[FilterResetEvent]="handleFilterReset"
        @[FilterSearchEvent]="handleFilterSearch"
      />
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import ZmQueryForm from './query-form/query-form.vue'
import type { QueryFormItemType } from './query-form/types'
import { useFilterEvents } from './hooks'
import { EVENT_NAMES } from './constants'

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
