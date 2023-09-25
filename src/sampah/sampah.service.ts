import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSampahDto } from './dto/create-sampah.dto';
import { UpdateSampahDto } from './dto/update-sampah.dto';
import { DataSource, Repository } from 'typeorm';
import { SampahEntity } from './entities/sampah.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SampahPriceEntity } from './entities/sampah-price.entity';
import { QueryParamsSampahDto } from './dto/query-sampah.dto';

@Injectable()
export class SampahService {
  constructor(
    @InjectRepository(SampahEntity)
    private sampahRepository: Repository<SampahEntity>,
    @InjectRepository(SampahPriceEntity)
    private sampahPriceRepository: Repository<SampahPriceEntity>,

    private dataSource: DataSource,
  ) {}

  async create(createSampahDto: CreateSampahDto) {
    const isSampahExists = await this.sampahRepository.findOneBy({
      name: createSampahDto.name,
      kategory: createSampahDto.kategory,
    });
    if (isSampahExists) throw new HttpException('sampah already exists', HttpStatus.CONFLICT);

    const sampah = this.sampahRepository.create(createSampahDto);
    const res_sampah = await this.sampahRepository.save(sampah);

    const sampah_price = this.sampahPriceRepository.create({ sampah: res_sampah, created_time: new Date().getTime() });
    await this.sampahPriceRepository.save(sampah_price);

    return;
  }

  findAll(queryParamsDto: QueryParamsSampahDto) {
    const queryBuilder = this.sampahPriceRepository.createQueryBuilder('price');
    queryBuilder.innerJoinAndSelect('price.sampah', 'sampah');

    queryParamsDto?.search &&
      queryBuilder
        .where('sampah.name ilike :search', {
          search: `%${queryParamsDto?.search}%`,
        })
        .orWhere('sampah.kategory ilike :search', {
          search: `%${queryParamsDto?.search}%`,
        });

    queryParamsDto?.category &&
      queryBuilder.andWhere('sampah.kategory = :kategory', {
        kategory: `${queryParamsDto?.category}`,
      });

    queryParamsDto?.price_more_than &&
      queryBuilder.andWhere('price.price >= :price_more_than', {
        price_more_than: queryParamsDto?.price_more_than,
      });

    queryParamsDto?.price_less_than &&
      queryBuilder.andWhere('price.price <= :transaction_less_than', {
        transaction_less_than: queryParamsDto?.price_less_than,
      });

    queryParamsDto?.date_start &&
      queryBuilder.andWhere('price.created_time >= :date_start', {
        date_start: new Date(queryParamsDto?.date_start).getTime(),
      });

    queryParamsDto?.date_end &&
      queryBuilder.andWhere('price.created_time < :date_end', {
        date_end: new Date(queryParamsDto.date_end).getTime(),
      });

    queryParamsDto.limit && queryBuilder.limit(queryParamsDto?.limit);
    queryParamsDto.limit && queryBuilder.offset(queryParamsDto?.limit * ((queryParamsDto?.page || 1) - 1));
    queryBuilder.distinctOn(['sampah.name']);
    queryBuilder.orderBy({
      'sampah.name': 'ASC',
      'price.price': 'DESC',
    });

    queryBuilder.select([
      'sampah.id id',
      'sampah.name name',
      'sampah.kategory kategory',
      'price.price price',
      'price.created_time created_time',
      'price.created created',
    ]);

    // queryBuilder.select([
    //   'nasabah.username username',
    //   'sampah.total_transaction total_transaction',
    //   'sampah.total_sampah total_sampah',
    // ]);
    // return await queryBuilder.execute();
    return queryBuilder.getRawMany();
  }

  async findOne(id: string) {
    const queryBuilder = this.sampahPriceRepository.createQueryBuilder('price');
    queryBuilder.innerJoinAndSelect('price.sampah', 'sampah');
    queryBuilder.distinctOn(['sampah.name']);
    queryBuilder.orderBy({ 'sampah.name': 'ASC', 'price.created_time': 'DESC' });
    queryBuilder.where('sampah.id::VARCHAR = :id', { id });
    // queryBuilder.orWhere('price.id = :id', { id });
    queryBuilder.select([
      'sampah.id id',
      'sampah.name name',
      'sampah.kategory kategory',
      'price.price price',
      'price.created_time created_time',
      'price.created created',
    ]);

    return (await queryBuilder.execute())[0];
  }

  async findHistoryById(id: string) {
    const queryBuilder = this.sampahPriceRepository.createQueryBuilder('price');
    queryBuilder.innerJoinAndSelect('price.sampah', 'sampah');
    // queryBuilder.distinctOn(['sampah.name']);
    queryBuilder.orderBy({ 'sampah.name': 'ASC', 'price.created_time': 'DESC' });
    queryBuilder.where('sampah.id = :id', { id });
    // queryBuilder.orWhere('price.id = :id', { id });
    queryBuilder.select([
      'sampah.id id',
      'sampah.name name',
      'sampah.kategory kategory',
      'price.price price',
      'price.created_time created_time',
      'price.created created',
    ]);

    return (await queryBuilder.execute())[0];
  }

  async update(id: string, updateSampahDto: UpdateSampahDto) {
    console.log({ id, updateSampahDto });
    const sampah = await this.findOne(id);
    if (!sampah) throw new HttpException('sampah is not found!', HttpStatus.NOT_FOUND);

    if (updateSampahDto.name || updateSampahDto.kategory) {
      await this.sampahRepository.update(id, {
        name: String(updateSampahDto.name).toUpperCase() || sampah.name,
        kategory: String(updateSampahDto.kategory).toUpperCase() || sampah.kategory,
      });
    }

    if (updateSampahDto.price) {
      console.log({ sampah, updateSampahDto });
      const sampahRelation = await this.sampahRepository.findOne({ where: { id } });
      await this.sampahPriceRepository.save({
        sampah: sampahRelation,
        price: updateSampahDto.price,
        created_time: new Date().getTime(),
      });
    }

    return this.findOne(id);
  }

  remove(id: string) {
    return `This action removes a #${id} sampah`;
  }
}
