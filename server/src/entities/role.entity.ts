/**
 * 角色实体
 */
import { ACTIVATION_STATUS } from '@constants/enums'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Auth } from './auth.entity'
import { User } from './user.entity'

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

  // 关联的权限列表
  @ManyToMany(() => Auth, auth => auth.roles)
  @JoinTable({
    name: 'zm-role-auth-relation',
    joinColumn: {
      name: 'role_id'
    },
    inverseJoinColumn: {
      name: 'auth_id'
    }
  })
  authorizations!: Auth[]

  // 关联的用户列表
  @ManyToMany(() => User, user => user.roles)
  users!: User[]

  @Column({ name: 'created_by' })
  createdBy!: string

  @Column({ type: 'date', name: 'created_at' })
  createdAt!: string

  @Column({ name: 'updated_by' })
  updatedBy!: string

  @Column({ type: 'date', name: 'updated_at' })
  updatedAt!: string
}
