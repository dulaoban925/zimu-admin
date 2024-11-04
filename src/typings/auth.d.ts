declare namespace ZiMuAuth {
  interface Menu {
    code: string // 菜单编码
    name: string // 菜单名称
    type: string // 类型：菜单 or 按钮
    sort: string | number // 排序
    level: string | number // 菜单层级
    icon?: string // 菜单图标
    navigateType?: string // 跳转类型
    path?: string // 跳转地址
    parent?: string // 父菜单名称
    children?: Menu[] // 子菜单集合
  }
}
