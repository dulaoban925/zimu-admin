/**
 * 用户实体
 */
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @PrimaryColumn({ name: 'job_no' })
  jobNo!: string

  @Column()
  name!: string

  @Column()
  sex!: string

  @Column()
  tel!: string

  @Column()
  email!: string

  @Column()
  address!: string

  @Column({ name: 'created_by' })
  createdBy!: string

  @Column({ type: 'date', name: 'created_at' })
  createdAt!: string

  @Column({ name: 'updated_by' })
  updatedBy!: string

  @Column({ type: 'date', name: 'updated_at' })
  updatedAt!: string
}
