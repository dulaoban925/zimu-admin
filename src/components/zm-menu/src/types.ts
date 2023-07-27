import type { RouteLocationRaw } from 'vue-router'
import { Component } from 'vue'
import { TOOLBAR_OPTION } from './constants'

export type ValueOf<T> = T[keyof T]

export interface ZmMenuDataItem {
  index: string
  label: string
  icon?: string
  isCollected?: boolean
  disabled?: boolean
  children?: Array<ZmMenuDataItem>
  [props: string]: string | boolean | Array<ZmMenuDataItem> | undefined
}

export interface ZmMenuItemClicked {
  index: string
  indexPath: string[]
  route?: RouteLocationRaw
}

// toolbar 操作按钮对象
export interface ActionItem {
  tip: string
  key: ValueOf<typeof TOOLBAR_OPTION>
  icon: Component
  visible: boolean
}

// filter 筛选事件参数
export interface FilterParams {
  selectValue: string
  inputValue: string
}
