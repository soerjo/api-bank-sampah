import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NasabahEntity } from './nasabah.entity';

@Entity('nasabah-balance')
export class NasabahBalanceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nasabah_id: string;

  @Column()
  total_transaction: number;

  @Column()
  total_balance: string;

  @ManyToOne(() => NasabahEntity, (nasabah) => nasabah.balance)
  nasabah: NasabahEntity[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
