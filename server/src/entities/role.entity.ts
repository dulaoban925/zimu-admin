/**
 * 角色实体
 */
import { ACTIVATION_STATUS, ACTIVATION_STATUS_DESC } from '@constants/enums'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { Auth } from './auth.entity'
import { BaseEntity } from './base/base.entity'
import { User } from './user.entity'

@Entity('role')
export class Role extends BaseEntity {
  // 角色编码
  @Column({ unique: true })
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

  get statusText() {
    return ACTIVATION_STATUS_DESC[this.status] ?? ''
  }

  // 关联的权限列表
  @ManyToMany(() => Auth, auth => auth.roles)
  @JoinTable({
    name: 'role-auth-relation',
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
}
