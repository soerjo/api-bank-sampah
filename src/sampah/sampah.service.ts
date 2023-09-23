import { Injectable } from '@nestjs/common';
import { CreateSampahDto } from './dto/create-sampah.dto';
import { UpdateSampahDto } from './dto/update-sampah.dto';
import { DataSource } from 'typeorm';
import { SampahEntity } from './entities/sampah.entity';

@Injectable()
export class SampahService {
  constructor(private dataSource: DataSource) {}

  async createSampahTransaction() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // const sampahEntity = queryRunner.manager.create(SampahEntity, {});
      // await queryRunner.manager.save(users[0]);
      // await queryRunner.manager.save(users[1]);

      const sampah = await queryRunner.manager.find(SampahEntity);

      await queryRunner.commitTransaction();
      return sampah;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  create(createSampahDto: CreateSampahDto) {
    return 'This action adds a new sampah';
  }

  findAll() {
    return `This action returns all sampah`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sampah`;
  }

  update(id: number, updateSampahDto: UpdateSampahDto) {
    return `This action updates a #${id} sampah`;
  }

  remove(id: number) {
    return `This action removes a #${id} sampah`;
  }
}
