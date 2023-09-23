import { Module } from '@nestjs/common';
import { SampahService } from './sampah.service';
import { SampahController } from './sampah.controller';

@Module({
  controllers: [SampahController],
  providers: [SampahService],
})
export class SampahModule {}
