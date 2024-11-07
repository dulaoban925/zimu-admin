// 表格默认 props
export const DEFAULT_TABLE_PROPS = {
  border: true
}

// 分页器默认 props
export const DEFAULT_PAGINATION_PROPS = {
  total: 0,
  pageSizes: [10, 20, 50, 100],
  layout: 'total, sizes, prev, pager, next, jumper'
}

// 筛选表单 props
export const DEFAULT_FILTER_FORM_PROPS = {}

/** queryForm start */
export const INPUT_NAME = 'Input'
export const INPUT_NUMBER_NAME = 'InputNumber'
export const SELECT_NAME = 'Select'
export const CHECKBOX_NAME = 'Checkbox'
export const DATE_PICKER_NAME = 'DatePicker'
export const RADIO_NAME = 'Radio'
/** queryForm end */

export const EVENT_NAMES = {
  FILTER_RESET: 'filterReset',
  FILTER_SEARCH: 'filterSearch'
}

/** table-content start */
// 表体操作栏插槽
export const OPERATION_BAR_SLOTS = {
  OPERATION_BAR: 'operationBar',
  OPERATION_BAR_LEFT: 'operationBarLeft',
  OPERATION_BAR_RIGHT: 'operationBarRight'
}
/** table-content end */
