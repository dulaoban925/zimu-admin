/**
 * 菜单实体
 */
import { ACTIVATION_STATUS, MENU_TYPE, MENU_TYPE_DESC } from '@constants/enums'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
  VirtualColumn
} from 'typeorm'
import { Auth } from './auth.entity'

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

  // 类型描述
  get typeText(): string {
    return MENU_TYPE_DESC[this.type] ?? null
  }

  // 关联的角色列表
  @ManyToMany(() => Auth, auth => auth.menus)
  authorizations!: Auth[]

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

  // 父菜单 id
  @Column()
  parent!: string

  // 数据版本
  @VersionColumn()
  version!: number

  // 创建人
  @Column({ name: 'created_by' })
  createdBy!: string

  // 创建时间
  @CreateDateColumn({ type: 'date', name: 'created_at' })
  createdAt!: string

  // 更新人
  @Column({ name: 'updated_by' })
  updatedBy!: string

  // 更新时间
  @UpdateDateColumn({ type: 'date', name: 'updated_at' })
  updatedAt!: string

  // 删除时间
  @DeleteDateColumn({ type: 'date', name: 'delete_at' })
  deleteAt!: string
}
