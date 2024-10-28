export type ContextMenuItem = {
  key: ContextMenuItemType
  label: string
  icon: Component
  disabled: boolean
}

export type ContextMenuItemType =
  | 'close'
  | 'closeLeft'
  | 'closeRight'
  | 'closeOthers'
  | 'closeAll'
