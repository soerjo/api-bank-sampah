import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { NasabahEntity } from './nasabah.entity';

@Entity('nasabah-balance')
export class NasabahBalanceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  total_transaction: number;

  @Column({ default: 0 })
  total_balance: string;

  @ManyToOne(() => NasabahEntity, (nasabah) => nasabah.id)
  nasabah: NasabahEntity;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
