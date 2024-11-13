import { EVENT_NAMES } from '../constants'

export function useFilterEvents(emit: (event: string, ...args: any[]) => void) {
  const FilterEmits = [
    EVENT_NAMES.FILTER_RESET,
    EVENT_NAMES.FILTER_SEARCH,
    EVENT_NAMES.CHANGE_COLLAPSED
  ]
  const FilterResetEvent = EVENT_NAMES.FILTER_RESET
  const FilterSearchEvent = EVENT_NAMES.FILTER_SEARCH
  const changeCollapsedEvent = EVENT_NAMES.CHANGE_COLLAPSED

  const handleFilterReset = () => {
    emit(FilterResetEvent)
  }

  const handleFilterSearch = (val: any) => {
    emit(FilterSearchEvent, val)
  }

  const handleChangeCollapsed = (val: any) => {
    emit(changeCollapsedEvent, val)
  }

  return {
    FilterEmits,
    FilterResetEvent,
    FilterSearchEvent,
    changeCollapsedEvent,
    handleFilterReset,
    handleFilterSearch,
    handleChangeCollapsed
  }
}
