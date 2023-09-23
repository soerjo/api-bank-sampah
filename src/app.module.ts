import { Module } from '@nestjs/common';
import { SampahModule } from './sampah/sampah.module';
import { NasabahModule } from './nasabah/nasabah.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [SampahModule, NasabahModule, TransactionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
