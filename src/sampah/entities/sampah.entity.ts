import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SampahTypeEntity } from './sampah-type.entity';

@Entity('sampah')
export class SampahEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => SampahTypeEntity, (sampahtype) => sampahtype.sampah)
  kategory: SampahTypeEntity;

  @Column()
  jenis: string;

  @Column()
  price: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
