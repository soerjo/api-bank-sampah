import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TransactionEntity } from './transaction.entity';

@Entity('trasaction-type')
export class TransactionTypeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.type)
  transaction: TransactionEntity;

  @Column()
  jenis: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
