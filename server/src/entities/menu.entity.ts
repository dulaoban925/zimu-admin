/**
 * 菜单实体
 */
import { ACTIVATION_STATUS, MENU_TYPE, MENU_TYPE_DESC } from '@constants/enums'
import { CURRENT_USER } from '@constants/redis-keys'
import { get } from '@utils/redis'
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm'
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

  // 父菜单编码
  @Column()
  parent!: string
}
