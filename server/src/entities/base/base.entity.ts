/**
 * 实体通用字段
 */
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn
} from 'typeorm'

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  // 数据版本
  @VersionColumn()
  version!: number

  // 创建人
  @Column({ name: 'created_by' })
  createdBy!: string

  // 创建时间
  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt!: Date

  // 更新人
  @Column({ name: 'updated_by' })
  updatedBy!: string

  // 更新时间
  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt!: Date

  // 删除时间
  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at' })
  deletedAt!: Date
}
