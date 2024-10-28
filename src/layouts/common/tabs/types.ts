export type ContextMenuItem = {
  key: ContextMenuItemType
  label: string
  icon: Component
  disabled: boolean
}

export type ContextMenuItemType =
  | 'close'
  | 'refresh'
  | 'closeLeft'
  | 'closeRight'
  | 'closeOthers'
  | 'closeAll'
