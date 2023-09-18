import { EVENT_NAMES } from '../constants'

export function useFilterEvents(emit: (event: string, ...args: any[]) => void) {
  const FilterEmits = [EVENT_NAMES.FILTER_RESET, EVENT_NAMES.FILTER_SEARCH]
  const FilterResetEvent = EVENT_NAMES.FILTER_RESET
  const FilterSearchEvent = EVENT_NAMES.FILTER_SEARCH

  const handleFilterReset = () => {
    emit(FilterResetEvent)
  }

  const handleFilterSearch = (val: any) => {
    emit(FilterSearchEvent, val)
  }

  return {
    FilterEmits,
    FilterResetEvent,
    FilterSearchEvent,
    handleFilterReset,
    handleFilterSearch
  }
}
