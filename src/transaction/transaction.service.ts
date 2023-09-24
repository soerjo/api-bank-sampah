import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CreateDepositTransactionDto } from './dto/create-deposit-transaction.dto';
import { CreateWithdrawTransactionDto } from './dto/create-withdraw-transaction.dto';
import { Repository } from 'typeorm';
import { EtransactionType, TransactionEntity } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SampahService } from 'src/sampah/sampah.service';
import { NasabahService } from 'src/nasabah/nasabah.service';
import { SampahPriceEntity } from 'src/sampah/entities/sampah-price.entity';
import { SampahEntity } from 'src/sampah/entities/sampah.entity';
import { FindSampahDto } from './dto/find-sampah.dto';
import { QueryParamsTransactionDto } from './dto/query-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,

    private sampahService: SampahService,
    private nasabahService: NasabahService,
  ) {}

  async createDeposit(createTransactionDto: CreateDepositTransactionDto) {
    const nasabah = await this.nasabahService.findOne(createTransactionDto.nasabah_id);
    if (!nasabah) return new HttpException('nasabah is not exists!', HttpStatus.NOT_FOUND);

    const sampah: SampahEntity & SampahPriceEntity = await this.sampahService.findOne(createTransactionDto.sampah_id);
    if (!sampah) return new HttpException('sampah is not exists!', HttpStatus.NOT_FOUND);

    const total_price_sampah = createTransactionDto.weight * sampah.price;
    const admin_fee = (total_price_sampah * 25) / 100;
    const deposit = total_price_sampah - (total_price_sampah * 25) / 100;
    const depositTransaction = await this.transactionRepository.save({
      nasabah_id: createTransactionDto.nasabah_id,
      transaction_type: EtransactionType.DEPOSIT,
      sampah_name: sampah.name,
      sampah_category: sampah.kategory,
      sampah_price: sampah.price,
      weight: createTransactionDto.weight,
      total_sampah_price: total_price_sampah,
      admin_fee: admin_fee,
      total_deposit: deposit,
      created_time: new Date().getTime(),
    });

    await this.nasabahService.deposit(createTransactionDto.nasabah_id, deposit);

    return depositTransaction;
  }

  createWithdraw(createTransactionDto: CreateWithdrawTransactionDto) {
    return 'This action adds a new transaction';
  }

  findAll(queryParamsDto: QueryParamsTransactionDto) {
    // const queryBuilder = this.sampahPriceRepository.createQueryBuilder('price');
    // queryBuilder.innerJoinAndSelect('price.sampah', 'sampah');
    // queryParamsDto?.search &&
    //   queryBuilder.andWhere('sampah.name like :name', {
    //     name: `%${queryParamsDto?.search}%`,
    //   });
    // queryParamsDto?.category &&
    //   queryBuilder.andWhere('sampah.kategory = :kategory', {
    //     kategory: `${queryParamsDto?.category}`,
    //   });
    // queryParamsDto?.price_more_than &&
    //   queryBuilder.andWhere('price.price >= :price_more_than', {
    //     price_more_than: queryParamsDto?.price_more_than,
    //   });
    // queryParamsDto?.price_less_than &&
    //   queryBuilder.andWhere('price.price <= :transaction_less_than', {
    //     transaction_less_than: queryParamsDto?.price_less_than,
    //   });
    // queryParamsDto?.date_start &&
    //   queryBuilder.andWhere('price.created_time >= :date_start', {
    //     date_start: new Date(queryParamsDto?.date_start).getTime(),
    //   });
    // queryParamsDto?.date_end &&
    //   queryBuilder.andWhere('price.created_time < :date_end', {
    //     date_end: new Date(queryParamsDto.date_end).getTime(),
    //   });
    // queryBuilder.limit(queryParamsDto?.limit);
    // queryBuilder.offset(queryParamsDto?.limit * ((queryParamsDto?.page || 1) - 1));
    // queryBuilder.distinctOn(['sampah.name']);
    // queryBuilder.orderBy({
    //   'sampah.name': 'ASC',
    //   'price.created_time': 'DESC',
    // });
    // queryBuilder.select([
    //   'sampah.id id',
    //   'sampah.name name',
    //   'sampah.kategory kategory',
    //   'price.price price',
    //   'price.created_time created_time',
    //   'price.created created',
    // ]);
    // // queryBuilder.select([
    // //   'nasabah.username username',
    // //   'sampah.total_transaction total_transaction',
    // //   'sampah.total_sampah total_sampah',
    // // ]);
    // // return await queryBuilder.execute();
    // return queryBuilder.getRawMany();
  }

  findOne(id: string) {
    return `This action returns a #${id} transaction`;
  }

  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: string) {
    return `This action removes a #${id} transaction`;
  }
}
