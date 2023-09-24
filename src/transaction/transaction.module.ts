import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { SampahModule } from 'src/sampah/sampah.module';
import { NasabahModule } from 'src/nasabah/nasabah.module';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity]), SampahModule, NasabahModule],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
