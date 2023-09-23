import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NasabahBalanceEntity } from './balance.entity';

@Entity('nasabah')
export class NasabahEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  fullname: string;

  @Column()
  phone: string;

  @Column()
  rt: string;

  @Column()
  rw: string;

  @OneToOne(() => NasabahBalanceEntity, (balance) => balance.nasabah)
  @JoinColumn()
  balance: NasabahBalanceEntity;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
