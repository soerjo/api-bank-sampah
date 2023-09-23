import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SampahEntity } from './sampah.entity';

@Entity('sampah-price')
export class SampahPriceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => SampahEntity)
  @JoinTable()
  sampah: SampahEntity;

  @Column()
  price: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
