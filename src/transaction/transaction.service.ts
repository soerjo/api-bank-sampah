import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDepositTransactionDto } from './dto/create-deposit-transaction.dto';
import { CreateWithdrawTransactionDto } from './dto/create-withdraw-transaction.dto';
import { DataSource, Repository } from 'typeorm';
import { EtransactionType, TransactionEntity } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SampahService } from 'src/sampah/sampah.service';
import { NasabahService } from 'src/nasabah/nasabah.service';
import { SampahPriceEntity } from 'src/sampah/entities/sampah-price.entity';
import { SampahEntity } from 'src/sampah/entities/sampah.entity';
import { QueryParamsTransactionDto } from './dto/query-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,

    private sampahService: SampahService,
    private nasabahService: NasabahService,

    private dataSource: DataSource,
  ) {}

  async createDeposit(createTransactionDto: CreateDepositTransactionDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const nasabah = await this.nasabahService.findOne(createTransactionDto.nasabah_id);
      if (!nasabah) return new HttpException('nasabah is not exists!', HttpStatus.NOT_FOUND);

      const sampah: SampahEntity & SampahPriceEntity = await this.sampahService.findOne(createTransactionDto.sampah_id);
      if (!sampah) return new HttpException('sampah is not exists!', HttpStatus.NOT_FOUND);

      const total_price_sampah = createTransactionDto.weight * sampah.price;
      const admin_fee = (total_price_sampah * 25) / 100;
      const deposit = total_price_sampah - (total_price_sampah * 25) / 100;

      const nasabahRelation = await this.nasabahService.findOneForRelations(createTransactionDto.nasabah_id);
      const depositTransaction = await this.transactionRepository.save({
        nasabah: nasabahRelation,
        transaction_type: EtransactionType.DEPOSIT,
        sampah_name: sampah.name,
        sampah_category: sampah.kategory,
        sampah_price: sampah.price,
        weight: createTransactionDto.weight,
        total_sampah_price: total_price_sampah,
        admin_fee: admin_fee,
        total_transaction: deposit,
        created_time: new Date().getTime(),
      });

      await this.nasabahService.deposit(createTransactionDto.nasabah_id, deposit);

      await queryRunner.commitTransaction();
      return depositTransaction;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      console.error(err);
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async createWithdraw(createTransactionDto: CreateWithdrawTransactionDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const nasabah = await this.nasabahService.findOne(createTransactionDto.nasabah_id);
      if (!nasabah) return new HttpException('nasabah is not exists!', HttpStatus.NOT_FOUND);

      const nasabahRelation = await this.nasabahService.findOneForRelations(createTransactionDto.nasabah_id);
      const depositTransaction = await this.transactionRepository.save({
        nasabah: nasabahRelation,
        transaction_type: EtransactionType.WITHDRAW,
        total_transaction: createTransactionDto.withdraw,
        created_time: new Date().getTime(),
      });

      await this.nasabahService.withdraw(createTransactionDto.nasabah_id, createTransactionDto.withdraw);

      await queryRunner.commitTransaction();
      return depositTransaction;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      console.error(err);
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async findAll(queryParamsDto: QueryParamsTransactionDto) {
    try {
      const queryBuilder = this.transactionRepository.createQueryBuilder('transaction');
      queryBuilder.innerJoinAndSelect('transaction.nasabah', 'nasabah');
      queryParamsDto?.search &&
        queryBuilder
          .andWhere('nasabah.username like :username', {
            username: `%${queryParamsDto?.search}%`,
          })
          .orWhere('transaction.sampah_name like :sampah_name', {
            sampah_name: `%${queryParamsDto?.search}%`,
          })
          .orWhere('transaction.sampah_category like :sampah_category', {
            sampah_category: `%${queryParamsDto?.search}%`,
          });

      queryParamsDto?.nasabah_id &&
        queryBuilder.andWhere('nasabah.id = :nasabah_id', {
          nasabah_id: queryParamsDto?.nasabah_id,
        });

      queryParamsDto?.transaction_type &&
        queryBuilder.andWhere('transaction.transaction_type = :transaction_type', {
          transaction_type: queryParamsDto?.transaction_type,
        });

      queryParamsDto?.price_more_than &&
        queryBuilder.andWhere('transaction.total_sampah_price >= :price_more_than', {
          price_more_than: queryParamsDto?.price_more_than,
        });
      queryParamsDto?.price_less_than &&
        queryBuilder.andWhere('transaction.total_sampah_price <= :price_less_than', {
          price_less_than: queryParamsDto?.price_less_than,
        });

      queryParamsDto?.weight_more_than &&
        queryBuilder.andWhere('transaction.weigth >= :weight_more_than', {
          weight_more_than: queryParamsDto?.weight_more_than,
        });
      queryParamsDto?.weight_less_than &&
        queryBuilder.andWhere('transaction.weigth <= :weight_less_than', {
          weight_less_than: queryParamsDto?.weight_less_than,
        });

      queryParamsDto?.date_start &&
        queryBuilder.andWhere('transaction.created_time >= :date_start', {
          date_start: new Date(queryParamsDto?.date_start).getTime(),
        });
      queryParamsDto?.date_end &&
        queryBuilder.andWhere('transaction.created_time < :date_end', {
          date_end: new Date(queryParamsDto.date_end).getTime(),
        });

      queryBuilder.limit(queryParamsDto?.limit);
      queryBuilder.offset(queryParamsDto?.limit * ((queryParamsDto?.page || 1) - 1));
      // queryBuilder.distinctOn(['nasabah.name']);
      // queryBuilder.orderBy({
      //   'nasabah.name': 'ASC',
      //   'transaction.created_time': 'DESC',
      // });
      // queryBuilder.select([
      //   'nasabah.id id',
      //   'nasabah.name name',
      //   'nasabah.kategory kategory',
      //   'transaction.price price',
      //   'transaction.created_time created_time',
      //   'price.created created',
      // ]);
      // queryBuilder.select([
      //   'nasabah.username username',
      //   'nasabah.total_transaction total_transaction',
      //   'nasabah.total_nasabah total_nasabah',
      // ]);
      // return await queryBuilder.execute();

      const response = await queryBuilder.getRawMany();
      return response;
    } catch (error) {
      console.error({ error_gue: error });
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
