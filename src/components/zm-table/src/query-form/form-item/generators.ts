import { ElInput, ElInputNumber } from 'element-plus'
import type {
  ItemType,
  QueryFormItemType,
  ZmInputProps,
  ZmInputNumberProps
} from '../types'
import {
  INPUT_NAME,
  INPUT_NUMBER_NAME,
  SELECT_NAME,
  CHECKBOX_NAME,
  DATE_PICKER_NAME,
  RADIO_NAME
} from '../../constants'
import { uniqueId } from 'lodash-es'
import { isObject } from '@/utils'

// 生成 Input
export function generateInput(props: ZmInputProps) {
  console.log('props', props)
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
  const result: QueryFormItemType[] = []
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
  const formItem: QueryFormItemType = {
    uid: uniqueId('zm')
  }

  // 设置了 filterable 且未设置具体属性，默认 input
  if ((filterableProp && !isObject(filterableProp)) || filterableProp === '') {
    if (!column.props?.prop)
      console.warn('若设置了 filterable, zm-table-column 的 props 必需')

    const defaultInputProps = {
      tagType: INPUT_NAME,
      tagProps: {
        type: 'text',
        modelKey: column.props?.prop,
        placeholder: `请输入${column.props?.label ?? ''}`
      },
      formItemProps: {
        label: column.props?.label ?? ''
      }
    }
    Object.assign(formItem, defaultInputProps)
  } else {
    Object.assign(formItem, filterableProp)
  }

  return formItem
}
