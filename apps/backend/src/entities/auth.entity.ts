/**
 * 权限实体
 */
import { ACTIVATION_STATUS, ACTIVATION_STATUS_DESC } from '@constants/enums'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from 'typeorm'
import { BaseEntity } from './base/base.entity'
import { Menu } from './menu.entity'
import { Role } from './role.entity'

@Entity('auth')
export class Auth extends BaseEntity {
  // 权限编码
  @Column({ unique: true })
  code!: string

  // 权限名称
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

  // 关联的角色列表
  @ManyToMany(() => Role, role => role.authorizations)
  roles!: Role[]

  // 关联的菜单列表
  @ManyToMany(() => Menu)
  @JoinTable({
    name: 'auth-menu-relation',
    joinColumn: {
      name: 'auth_id'
    },
    inverseJoinColumn: {
      name: 'menu_id'
    }
  })
  menus!: Menu[]
}
