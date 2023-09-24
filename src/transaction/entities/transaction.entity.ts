import { NasabahEntity } from 'src/nasabah/entities/nasabah.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum EtransactionType {
  WITHDRAW = 'WITHDRAW/TARIK',
  DEPOSIT = 'DEPOSIT/TABUNG',
}

@Entity('transaction')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => NasabahEntity, (nasabah) => nasabah.transactions)
  nasabah: NasabahEntity;

  @Column({ enum: EtransactionType })
  transaction_type: EtransactionType;

  @Column({ default: '-' })
  sampah_name: string;

  @Column({ default: '-' })
  sampah_category: string;

  @Column({ type: 'numeric', default: 0 })
  sampah_price: number;

  @Column({ type: 'numeric', default: 0 })
  weight: number;

  @Column({ type: 'numeric', default: 0 })
  total_sampah_price: number;

  @Column({ type: 'numeric', default: 0 })
  admin_fee: number;

  @Column({ type: 'numeric', default: 0 })
  total_transaction: number;

  @Column({ default: new Date().getTime(), type: 'bigint' })
  created_time: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
