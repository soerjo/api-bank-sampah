import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SampahPriceEntity } from './sampah-price.entity';

@Entity('sampah')
export class SampahEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  kategory: string;

  @OneToMany(() => SampahPriceEntity, (price) => price.sampah)
  price: SampahPriceEntity[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
