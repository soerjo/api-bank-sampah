import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { NasabahBalanceEntity } from './balance.entity';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';

@Entity('nasabah')
export class NasabahEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  fullname: string;

  @Column({ default: '-' })
  phone: string;

  @Column({})
  rt: string;

  @Column()
  rw: string;

  @OneToMany(() => NasabahBalanceEntity, (balance) => balance.id)
  balance: NasabahBalanceEntity[];

  @OneToMany(() => TransactionEntity, (transaction) => transaction.nasabah)
  transactions: TransactionEntity[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
