import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum EtransactionType {
  WITHDRAW = 'WITHDRAW/TARIK',
  DEPOSIT = 'DEPOSIT/TABUNG',
}

@Entity('trasaction')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nasabah_id: string;

  @Column({ enum: EtransactionType })
  transaction_type: EtransactionType;

  @Column()
  sampah_name: string;

  @Column()
  sampah_category: string;

  @Column({ type: 'numeric' })
  sampah_price: number;

  @Column({ type: 'numeric' })
  weight: number;

  @Column({ type: 'numeric' })
  total_sampah_price: number;

  @Column({ type: 'numeric' })
  admin_fee: number;

  @Column({ default: new Date().getTime(), type: 'bigint' })
  created_time: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
