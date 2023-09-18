import {
  INPUT_NAME,
  INPUT_NUMBER_NAME,
  SELECT_NAME,
  DATE_PICKER_NAME,
  CHECKBOX_NAME,
  RADIO_NAME
} from '../constants'
import type {
  DatePickerProps,
  FormItemProps,
  InputNumberProps,
  InputProps,
  ColProps
} from 'element-plus'

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

type CommonTagType = {
  modelKey: string
}

type InputTagProps = CommonTagType & InputProps

type InputNumberTagProps = CommonTagType & InputNumberProps

type SelectTagProps = CommonTagType & {}

type DatePickerTagProps = CommonTagType & {}

type CheckboxTagProps = CommonTagType & {}

type RadioTagProps = CommonTagType & DatePickerProps

export type TagProps =
  | InputTagProps
  | InputNumberTagProps
  | SelectTagProps
  | CheckboxTagProps
  | DatePickerTagProps
  | RadioTagProps

export interface QueryFormItemType {
  uid?: string | number
  formModel?: any
  tagProps?: TagProps
  tagType?: ItemType
  colProps?: ColProps
  formItemProps?: FormItemProps
}

// export type ZmInputItemType = CommonPart & InputProps

// export type ZmInputNumberItemType = CommonPart & InputNumberProps

// export type ZmSelectItemType = CommonPart & {}

// export type ZmCheckboxItemType = CommonPart & {}

// export type ZmDatePickerItemType = CommonPart & {}

// export type ZmRadioItemType = CommonPart & {}

// export type QueryFormItemType =
//   | ZmInputItemType
//   | ZmInputNumberItemType
//   | ZmSelectItemType
//   | ZmCheckboxItemType
//   | ZmDatePickerItemType
//   | ZmRadioItemType
//   | never

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
