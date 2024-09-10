/**
 * 用户实体
 */
import { USER_GENDER, USER_STATUS, Y_N } from '@constants/enums'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Role } from './role.entity'

@Entity('user')
export class User {
  // rowId
  @PrimaryGeneratedColumn()
  id!: number

  // 用户账号/工号
  @PrimaryColumn({ name: 'user_name' })
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

  // 电话
  @Column()
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

  // 创建人
  @Column({ name: 'created_by' })
  createdBy!: string

  // 创建时间
  @Column({ type: 'date', name: 'created_at' })
  createdAt!: string

  // 更新人
  @Column({ name: 'updated_by' })
  updatedBy!: string

  // 更新时间
  @Column({ type: 'date', name: 'updated_at' })
  updatedAt!: string
}
