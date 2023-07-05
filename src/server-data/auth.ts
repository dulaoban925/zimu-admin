// 菜单
export const menus: ZiMuAuth.Menu[] = [
  {
    code: 'Dashboard',
    label: '控制台',
    icon: 'Odometer',
    sort: 1,
    type: 'menu',
    level: 1
  },
  {
    code: 'Home',
    label: '主页',
    sort: 1,
    type: 'menu',
    level: 2,
    parent: 'Dashboard'
  },
  {
    code: 'SystemManage',
    label: '系统管理',
    icon: 'Setting',
    sort: 1,
    type: 'menu',
    level: 1
  },
  {
    code: 'UserManage',
    label: '用户管理',
    sort: 1,
    type: 'menu',
    level: 2,
    parent: 'SystemManage'
  },
  {
    code: 'MenuManage',
    label: '菜单管理',
    sort: 2,
    type: 'menu',
    level: 2,
    parent: 'SystemManage'
  }
]
