import { NasabahEntity } from 'src/nasabah/entities/nasabah.entity';
import { SampahEntity } from 'src/sampah/entities/sampah.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TransactionTypeEntity } from './transaction-type.entity';

@Entity('trasaction')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => NasabahEntity)
  @JoinTable()
  nasabah: NasabahEntity;

  @ManyToOne(() => TransactionTypeEntity, (type) => type.transaction)
  type: TransactionTypeEntity;

  @ManyToMany(() => SampahEntity)
  @JoinTable()
  sampah: SampahEntity;

  @Column()
  weight: number;

  @Column()
  total_sampah_price: number;

  @Column()
  admin_fee: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
