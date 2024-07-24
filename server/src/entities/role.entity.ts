/**
 * 角色实体
 */
import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from 'typeorm'
import { ACTIVATION_STATUS } from '@constants/enums'

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id!: number

  // 角色编码
  @PrimaryColumn()
  code!: string

  // 角色名称
  @Column()
  name!: string

  // 状态（激活 or 停用)
  @Column({
    type: 'enum',
    enum: ACTIVATION_STATUS,
    default: ACTIVATION_STATUS.ACTIVATED
  })
  status!: ACTIVATION_STATUS

  @Column({ name: 'created_by' })
  createdBy!: string

  @Column({ type: 'date', name: 'created_at' })
  createdAt!: string

  @Column({ name: 'updated_by' })
  updatedBy!: string

  @Column({ type: 'date', name: 'updated_at' })
  updatedAt!: string
}
