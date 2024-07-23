/**
 * 菜单实体
 */
import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from 'typeorm'
import { MENU_TYPE, MENU_STATUS } from '@constants/enums/menu'

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn()
  id!: number

  // 菜单编码
  @PrimaryColumn()
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
    enum: MENU_STATUS,
    default: MENU_STATUS.ACTIVATED
  })
  status!: MENU_STATUS

  @Column({ name: 'created_by' })
  createdBy!: string

  @Column({ type: 'date', name: 'created_at' })
  createdAt!: string

  @Column({ name: 'updated_by' })
  updatedBy!: string

  @Column({ type: 'date', name: 'updated_at' })
  updatedAt!: string
}
