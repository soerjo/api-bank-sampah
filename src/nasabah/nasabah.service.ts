import { Injectable } from '@nestjs/common';
import { CreateNasabahDto } from './dto/create-nasabah.dto';
import { UpdateNasabahDto } from './dto/update-nasabah.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NasabahEntity } from './entities/nasabah.entity';
import { NasabahBalanceEntity } from './entities/balance.entity';

@Injectable()
export class NasabahService {
  constructor(
    @InjectRepository(NasabahEntity)
    private nasabahRepository: Repository<NasabahEntity>,
    @InjectRepository(NasabahBalanceEntity)
    private nasabahBalanceRepository: Repository<NasabahBalanceEntity>,
  ) {}

  async create(createNasabahDto: CreateNasabahDto) {
    const nasabah = this.nasabahRepository.create(createNasabahDto);
    const res_nasabah = await this.nasabahRepository.save(nasabah);

    const nasabah_balance = this.nasabahBalanceRepository.create({ nasabah: res_nasabah });
    await this.nasabahBalanceRepository.save(nasabah_balance);

    return await this.getNasabahBalance();
  }

  async getNasabahBalance() {
    const queryBuilder = this.nasabahBalanceRepository.createQueryBuilder('balance');
    queryBuilder.leftJoinAndSelect('balance.nasabah', 'nasabah');
    return await queryBuilder.execute();

    // const queryBuilder = this.nasabahRepository.createQueryBuilder('nasabah');
    // queryBuilder.leftJoinAndSelect('nasabah.balance', 'balance');
    // return await queryBuilder.execute();
  }

  findAll() {
    return `This action returns all nasabah`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nasabah`;
  }

  update(id: number, updateNasabahDto: UpdateNasabahDto) {
    return `This action updates a #${id} nasabah`;
  }

  remove(id: number) {
    return `This action removes a #${id} nasabah`;
  }
}
