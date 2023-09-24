import { Module } from '@nestjs/common';
import { NasabahService } from './nasabah.service';
import { NasabahController } from './nasabah.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NasabahEntity } from './entities/nasabah.entity';
import { NasabahBalanceEntity } from './entities/balance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NasabahEntity, NasabahBalanceEntity])],
  controllers: [NasabahController],
  providers: [NasabahService],
  exports: [NasabahService],
})
export class NasabahModule {}
