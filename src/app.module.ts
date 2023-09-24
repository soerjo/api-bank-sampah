import { Module } from '@nestjs/common';
import { SampahModule } from './sampah/sampah.module';
import { NasabahModule } from './nasabah/nasabah.module';
import { TransactionModule } from './transaction/transaction.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampahEntity } from './sampah/entities/sampah.entity';
import { SampahPriceEntity } from './sampah/entities/sampah-price.entity';
import { NasabahEntity } from './nasabah/entities/nasabah.entity';
import { NasabahBalanceEntity } from './nasabah/entities/balance.entity';
import { TransactionEntity } from './transaction/entities/transaction.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      database: process.env.DB_DATABASE,
      entities: [SampahEntity, SampahPriceEntity, NasabahEntity, NasabahBalanceEntity, TransactionEntity],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    SampahModule,
    NasabahModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
