import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNasabahDto } from './dto/create-nasabah.dto';
import { UpdateNasabahDto } from './dto/update-nasabah.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { NasabahEntity } from './entities/nasabah.entity';
import { NasabahBalanceEntity } from './entities/balance.entity';
import { QueryParamsDto } from './dto/query-params.dto';
import delay from 'src/utils/delay.util';

@Injectable()
export class NasabahService {
  constructor(
    @InjectRepository(NasabahEntity)
    private nasabahRepository: Repository<NasabahEntity>,
    @InjectRepository(NasabahBalanceEntity)
    private nasabahBalanceRepository: Repository<NasabahBalanceEntity>,

    private dataSource: DataSource,
  ) {}

  async create(createNasabahDto: CreateNasabahDto) {
    const isUsernameExists = await this.findByName(createNasabahDto.username);
    if (isUsernameExists) throw new HttpException('username is exists', HttpStatus.CONFLICT);

    const nasabah = this.nasabahRepository.create(createNasabahDto);
    const res_nasabah = await this.nasabahRepository.save(nasabah);

    const nasabah_balance = this.nasabahBalanceRepository.create({ nasabah: res_nasabah });
    await this.nasabahBalanceRepository.save(nasabah_balance);

    return;
  }

  async findAll(QueryParamsDto: QueryParamsDto) {
    const queryBuilder = this.nasabahBalanceRepository.createQueryBuilder('balance');
    queryBuilder.innerJoinAndSelect('balance.nasabah', 'nasabah');

    QueryParamsDto?.search &&
      queryBuilder
        .andWhere('nasabah.username like :name', {
          name: `%${QueryParamsDto?.search}%`,
        })
        .orWhere('nasabah.fullname like :fullname', {
          fullname: `%${QueryParamsDto?.search}%`,
        })
        .orWhere('nasabah.phone like :phone', {
          phone: `%${QueryParamsDto?.search}%`,
        });

    QueryParamsDto?.transaction_more_than &&
      queryBuilder.andWhere('balance.total_transaction >= :transaction_more', {
        transaction_more: QueryParamsDto?.transaction_more_than,
      });

    QueryParamsDto?.transaction_less_than &&
      queryBuilder.andWhere('balance.total_transaction <= :transaction_less', {
        transaction_less: QueryParamsDto?.transaction_less_than,
      });

    QueryParamsDto?.balance_more_than &&
      queryBuilder.andWhere('balance.total_balance >= :balance_more', {
        balance_more: QueryParamsDto?.balance_more_than,
      });

    QueryParamsDto?.balance_less_than &&
      queryBuilder.andWhere('balance.total_balance <= :balance_less', {
        balance_less: QueryParamsDto?.balance_less_than,
      });

    queryBuilder.distinctOn(['nasabah.id']);
    queryBuilder.orderBy({ 'nasabah.id': 'ASC', 'balance.created': 'DESC' });

    QueryParamsDto?.limit && queryBuilder.limit(QueryParamsDto?.limit);
    QueryParamsDto?.limit && queryBuilder.offset(QueryParamsDto?.limit * ((QueryParamsDto?.page || 1) - 1));

    // queryBuilder.select([
    //   'nasabah.username username',
    //   'balance.total_transaction total_transaction',
    //   'balance.total_balance total_balance',
    // ]);
    // return await queryBuilder.execute();
    // await delay(5000);
    return queryBuilder.getRawMany();
  }

  async getTotalNasabah() {
    return { total_nasabah: await this.nasabahRepository.count() };
  }

  async findByName(username: string) {
    return await this.nasabahRepository.findOneBy({ username });
  }

  async findOne(id: string) {
    const queryBuilder = this.nasabahBalanceRepository.createQueryBuilder('balance');
    queryBuilder.innerJoinAndSelect('balance.nasabah', 'nasabah');
    queryBuilder.where('nasabah.id = :id', { id });
    queryBuilder.distinctOn(['nasabah.id']);
    queryBuilder.orderBy({
      'nasabah.id': 'ASC',
      'balance.created': 'DESC',
    });
    queryBuilder.select([
      'nasabah.id id',
      'nasabah.username username',
      'nasabah.fullname fullname',
      'nasabah.phone phone',
      'nasabah.rt rt',
      'nasabah.rw rw',
      'balance.total_transaction total_transaction',
      'balance.total_balance total_balance',
      'balance.created created',
      'balance.updated updated',
    ]);

    return (await queryBuilder.execute())[0];
  }

  findOneForRelations(id: string) {
    return this.nasabahRepository.findOne({ where: { id } });
  }

  async update(id: string, updateNasabahDto: UpdateNasabahDto) {
    const isNasabahExist = await this.findOne(id);
    if (!isNasabahExist) throw new HttpException('nasabah is not found!', HttpStatus.NOT_FOUND);

    const isUsernameExists = await this.findByName(updateNasabahDto?.username);
    if (isUsernameExists) throw new HttpException('username is exists', HttpStatus.CONFLICT);

    await this.nasabahRepository.update(id, {
      username: updateNasabahDto.username || isNasabahExist[0].username,
      fullname: updateNasabahDto.fullname || isNasabahExist[0].fullname,
      phone: updateNasabahDto.phone || isNasabahExist[0].phone,
      rt: updateNasabahDto.rt || isNasabahExist[0].rt,
      rw: updateNasabahDto.rw || isNasabahExist[0].rw,
    });

    return this.findOne(id);
  }

  async deposit(id: string, deposit_balance: number) {
    const nasabah = await this.findOne(id);
    if (!nasabah) throw new HttpException('nasabah is not found!', HttpStatus.NOT_FOUND);

    return this.nasabahBalanceRepository.save({
      nasabah: nasabah,
      total_transaction: nasabah.total_transaction + 1,
      total_balance: nasabah.total_balance + deposit_balance,
    });
  }

  async withdraw(id: string, withdraw_balance: number) {
    const nasabah = await this.findOne(id);
    if (!nasabah) throw new HttpException('nasabah is not found!', HttpStatus.NOT_FOUND);

    return this.nasabahBalanceRepository.save({
      nasabah: nasabah,
      total_balance: nasabah.asal - withdraw_balance,
    });
  }

  remove(id: string) {
    return `This action removes a #${id} nasabah`;
  }
}
