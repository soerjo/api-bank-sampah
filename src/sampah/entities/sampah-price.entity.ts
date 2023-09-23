import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SampahEntity } from './sampah.entity';

@Entity('sampah-price')
export class SampahPriceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => SampahEntity, (sampah) => sampah.price)
  sampah: SampahEntity;

  @Column({ default: 0 })
  price: number;

  @Column({ default: new Date().getTime(), type: 'bigint' })
  created_time: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
