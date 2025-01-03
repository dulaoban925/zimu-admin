/**
 * 菜单实体
 */
import {
  ACTIVATION_STATUS,
  ACTIVATION_STATUS_DESC,
  MENU_NAVIGATE_TYPE,
  MENU_NAVIGATE_TYPE_DESC,
  MENU_TYPE,
  MENU_TYPE_DESC
} from '@constants/enums'
import { Column, Entity } from 'typeorm'
import { BaseEntity } from './base/base.entity'

@Entity({ name: 'menu' })
export class Menu extends BaseEntity {
  // 菜单编码
  @Column({ unique: true })
  code!: string

  // 菜单名称
  @Column()
  name!: string

  // 菜单类型(菜单menu or 按钮button or 页面 page)
  @Column({
    type: 'enum',
    enum: MENU_TYPE
  })
  type!: MENU_TYPE

  // 类型描述
  get typeText(): string {
    return MENU_TYPE_DESC[this.type] ?? null
  }

  // 跳转类型
  @Column({ name: 'navigate_type', type: 'enum', enum: MENU_NAVIGATE_TYPE })
  navigateType!: MENU_NAVIGATE_TYPE

  // 跳转类型描述
  get navigateTypeText(): string {
    return MENU_NAVIGATE_TYPE_DESC[this.navigateType] ?? null
  }

  // 路径
  @Column()
  path!: string

  // 层级
  @Column()
  level!: number

  // 排序
  @Column()
  sort!: number

  // 菜单图标
  @Column()
  icon!: string

  // 状态（激活 or 停用)
  @Column({
    type: 'enum',
    enum: ACTIVATION_STATUS,
    default: ACTIVATION_STATUS.ACTIVATED
  })
  status!: ACTIVATION_STATUS

  // 状态描述
  get statusText(): string {
    return ACTIVATION_STATUS_DESC[this.status] ?? null
  }

  // 父菜单编码
  @Column()
  parent!: string
}
