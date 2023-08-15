import type {
  DatePickerProps,
  FormItemProps,
  InputNumberProps,
  InputProps,
  ColProps
} from 'element-plus'
import {
  INPUT_NAME,
  INPUT_NUMBER_NAME,
  SELECT_NAME,
  DATE_PICKER_NAME,
  CHECKBOX_NAME,
  RADIO_NAME
} from '../constants'

export type ItemType =
  | typeof INPUT_NAME
  | typeof INPUT_NUMBER_NAME
  | typeof SELECT_NAME
  | typeof DATE_PICKER_NAME
  | typeof CHECKBOX_NAME
  | typeof RADIO_NAME

export type QueryFormItemProp = FormItemProps & {
  type: ItemType
}

type SelectProps = {}

type CheckboxProps = {}

type RadioProps = {}

export type TagProps =
  | InputProps
  | InputNumberProps
  | SelectProps
  | CheckboxProps
  | DatePickerProps
  | RadioProps

interface CommonPart {
  uid?: string | number
  formModel?: any
  tagType?: ItemType
  tagProps?: TagProps
  colProps?: ColProps
  formItemProps?: FormItemProps
}

export type ZmInputItemType = CommonPart & InputProps

export type ZmInputNumberItemType = CommonPart & InputNumberProps

export type ZmSelectItemType = CommonPart & SelectProps

export type ZmCheckboxItemType = CommonPart & CheckboxProps

export type ZmDatePickerItemType = CommonPart & DatePickerProps

export type ZmRadioItemType = CommonPart & RadioProps

export type QueryFormItemType =
  | ZmInputItemType
  | ZmInputNumberItemType
  | ZmSelectItemType
  | ZmCheckboxItemType
  | ZmDatePickerItemType
  | ZmRadioItemType
  | never

export interface InputEventProps {
  onBlur: (evt: FocusEvent) => void
  onFocus: (evt: FocusEvent) => void
  onChange: (value: string | number) => void
  onInput: (value: string | number) => void
  onClear: () => void
}

export type ZmInputProps = InputProps & InputEventProps

export interface InputNumberEventProps {
  onBlur: (evt: FocusEvent) => void
  onFocus: (evt: FocusEvent) => void
  onChange: (
    currentValue: number | undefined,
    oldValue: number | undefined
  ) => void
}

export type ZmInputNumberProps = InputNumberProps & InputNumberEventProps
