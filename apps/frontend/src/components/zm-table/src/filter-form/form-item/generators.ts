import { ElInput, ElInputNumber } from 'element-plus'
import { uniqueId } from 'lodash-es'
import { isObject } from '@/utils'
import {
  CHECKBOX_NAME,
  DATE_PICKER_NAME,
  INPUT_NAME,
  INPUT_NUMBER_NAME,
  RADIO_NAME,
  SELECT_NAME
} from '../../constants'
import type {
  FilterFormItemType,
  ItemType,
  ZmInputNumberProps,
  ZmInputProps
} from '../types'

// 生成 Input
export function generateInput(props: ZmInputProps) {
  return h(ElInput, props)
}

// 生成 InputNumber
export function generateInputNumber(props: ZmInputNumberProps) {
  return h(ElInputNumber, props)
}

// 生成 Select
export function generateSelect() {}

// 生成 DatePicker
export function generateDatePicker() {}

// 生成 Checkbox
export function generateCheckbox() {}

// 生成 Radio
export function generateRadio() {}

// 组件类型与生成函数的映射
export const typeGeneratorMap: Record<ItemType, (...args: any) => void> = {
  [INPUT_NAME]: generateInput,
  [INPUT_NUMBER_NAME]: generateInputNumber,
  [SELECT_NAME]: generateSelect,
  [CHECKBOX_NAME]: generateCheckbox,
  [DATE_PICKER_NAME]: generateDatePicker,
  [RADIO_NAME]: generateRadio
}

/**
 * 根据 ZmTableColumn 生成 QueryForm item 对象
 * @param columns 有效的 ZmTableColumn 组件 VNode 列表
 */
export function generateFormItemsByColumns(columns?: VNode[]) {
  if (!columns || !columns.length) return []
  const result: FilterFormItemType[] = []
  for (const c of columns) {
    const formItem = generateFormItemByColumn(c)
    formItem && result.push(formItem)
  }

  return result
}

/**
 * 根据 ZmTableColumn 生成单个 QueryForm item 对象
 * @param columns 有效的 ZmTableColumn 组件 VNode
 */
export function generateFormItemByColumn(column: VNode) {
  const filterableProp = column.props?.filterable ?? false
  if (!filterableProp && filterableProp !== '') return
  const uid = uniqueId('zm')
  const formItem: FilterFormItemType = {
    uid
  }

  if (filterableProp || filterableProp === '') {
    const { prop, columnKey } = column.props ?? {}
    if (!prop && !columnKey)
      console.warn(
        '若设置了 filterable, zm-table-column 必需配置 prop 或 column-key 属性'
      )
    const modelKey = prop ?? columnKey ?? uid
    // 设置了 filterable 且未设置具体属性，默认 input
    if (!isObject(filterableProp)) {
      const defaultInputProps = {
        tagType: INPUT_NAME,
        tagProps: {
          type: 'text',
          modelKey,
          placeholder: `请输入${column.props?.label ?? ''}`
        },
        formItemProps: {
          label: column.props?.label ?? ''
        }
      }
      Object.assign(formItem, defaultInputProps)
    } else {
      if (!filterableProp.tagProps?.modelKey)
        filterableProp.tagProps.modelKey = modelKey
      Object.assign(formItem, filterableProp)
    }
  }

  return formItem
}
