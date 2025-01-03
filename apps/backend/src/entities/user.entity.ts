/**
 * 用户实体
 */
import {
  USER_GENDER,
  USER_GENDER_DESC,
  USER_STATUS,
  USER_STATUS_DESC,
  Y_N
} from '@constants/enums'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { BaseEntity } from './base/base.entity'
import { Role } from './role.entity'

@Entity('user')
export class User extends BaseEntity {
  // 用户账号/工号
  @Column({ name: 'user_name', unique: true })
  username!: string

  // 用户密码
  @Column()
  password!: string

  // 姓名
  @Column()
  name!: string

  // 性别
  @Column({
    type: 'enum',
    enum: USER_GENDER
  })
  gender!: USER_GENDER

  get genderText() {
    return USER_GENDER_DESC[this.gender] ?? ''
  }

  // 电话
  @Column({ unique: true })
  tel!: string

  // 电子邮箱
  @Column()
  email!: string

  // 住址
  @Column()
  address!: string

  // 状态
  @Column({
    type: 'enum',
    enum: USER_STATUS,
    default: USER_STATUS.SERVING
  })
  status!: USER_STATUS

  get statusText() {
    return USER_STATUS_DESC[this.status] ?? ''
  }

  // 关联的角色列表
  @ManyToMany(() => Role, (role: Role) => role.users)
  @JoinTable({
    name: 'role-user-relation',
    joinColumn: {
      name: 'user_id'
    },
    inverseJoinColumn: {
      name: 'role_id'
    }
  })
  roles!: Role[]

  // 是否超管
  @Column({
    name: 'is_admin',
    type: 'enum',
    enum: Y_N
  })
  isAdmin!: Y_N
}
