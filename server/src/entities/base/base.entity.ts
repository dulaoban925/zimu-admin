/**
 * 实体通用字段
 */
import { CURRENT_USER } from '@constants/redis-keys'
import { get } from '@utils/redis'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn
} from 'typeorm'

export abstract class BaseEntity {
  constructor(entity: any) {
    Object.assign(this, entity)
  }

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

  @BeforeInsert()
  async beforeInsert() {
    this.createdBy = (await get(CURRENT_USER)) as string
  }

  @BeforeUpdate()
  async beforeUpdate() {
    this.updatedBy = (await get(CURRENT_USER)) as string
  }
}
