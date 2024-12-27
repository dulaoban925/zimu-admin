<template>
  <div class="zm-table__filter">
    <slot>
      <zm-filter-form
        v-bind="props"
        :card-props="cardProps"
        :items="formItems"
        @[FilterResetEvent]="handleFilterReset"
        @[FilterSearchEvent]="handleFilterSearch"
        @[changeCollapsedEvent]="handleChangeCollapsed"
      />
    </slot>
  </div>
</template>

<script setup lang="ts">
import { EVENT_NAMES, FILTER_FORM_PROPS } from './constants'
import ZmFilterForm from './filter-form/filter-form.vue'
import { useFilterEvents } from './hooks/use-filter-events'
import type { FilterFormItemType } from './filter-form/types'
import type { CardProps } from 'element-plus'

defineOptions({
  name: 'ZmTableFilter'
})

type Props = {
  formItems?: FilterFormItemType[]
  cardProps?: CardProps
}

const { formItems = [] } = defineProps<Props>()

const emit = defineEmits([
  EVENT_NAMES.FILTER_RESET,
  EVENT_NAMES.FILTER_SEARCH,
  EVENT_NAMES.CHANGE_COLLAPSED
])

const props = inject(FILTER_FORM_PROPS, {})

const {
  FilterResetEvent,
  FilterSearchEvent,
  changeCollapsedEvent,
  handleFilterReset,
  handleFilterSearch,
  handleChangeCollapsed
} = useFilterEvents(emit)
</script>

<style scoped></style>
