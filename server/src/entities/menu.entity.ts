/**
 * 菜单实体
 */
import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from 'typeorm'

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

  // 菜单类型(菜单menu or 按钮button)
  @Column()
  type!: string

  // 层级
  @Column()
  level!: number

  // 排序
  @Column()
  sort!: number

  // 菜单图标
  @Column()
  icon!: string

  // 状态
  @Column()
  status!: string

  @Column({ name: 'created_by' })
  createdBy!: string

  @Column({ type: 'date', name: 'created_at' })
  createdAt!: string

  @Column({ name: 'updated_by' })
  updatedBy!: string

  @Column({ type: 'date', name: 'updated_at' })
  updatedAt!: string
}
