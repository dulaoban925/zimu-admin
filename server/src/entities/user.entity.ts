/**
 * 用户实体
 */
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from 'typeorm'
import { encryptPassword } from '@utils/pwd'
import { USER_SEX, USER_STATUS } from '@constants/enums'
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
  @Column({
    transformer: {
      to(entityValue) {
        return entityValue ? encryptPassword(entityValue) : null
      },
      from(dbValue) {
        return dbValue
      }
    }
  })
  password!: string

  // 姓名
  @Column()
  name!: string

  // 性别
  @Column({
    type: 'enum',
    enum: USER_SEX
  })
  sex!: USER_SEX

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
  @ManyToMany(() => Role, role => role.users)
  @JoinTable({
    name: 'zm-role-user-relation',
    joinColumn: {
      name: 'user_id'
    },
    inverseJoinColumn: {
      name: 'role_id'
    }
  })
  roles!: Role[]

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
