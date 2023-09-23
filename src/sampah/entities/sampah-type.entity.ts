import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SampahEntity } from './sampah.entity';

@Entity('sampah-type')
export class SampahTypeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => SampahEntity, (sampah) => sampah.kategory)
  sampah: SampahEntity[];

  @Column()
  name: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
