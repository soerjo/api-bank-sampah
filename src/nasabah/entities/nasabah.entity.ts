import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { NasabahBalanceEntity } from './balance.entity';

@Entity('nasabah')
export class NasabahEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  fullname: string;

  @Column({ default: '-' })
  phone: string;

  @Column()
  rt: string;

  @Column()
  rw: string;

  @OneToMany(() => NasabahBalanceEntity, (balance) => balance.id)
  balance: NasabahBalanceEntity[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
