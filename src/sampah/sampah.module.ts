import { Module } from '@nestjs/common';
import { SampahService } from './sampah.service';
import { SampahController } from './sampah.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampahEntity } from './entities/sampah.entity';
import { SampahTypeEntity } from './entities/sampah-type.entity';
import { SampahPriceEntity } from './entities/sampah-price.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SampahEntity,
      SampahTypeEntity,
      SampahPriceEntity,
    ]),
  ],
  controllers: [SampahController],
  providers: [SampahService],
})
export class SampahModule {}
