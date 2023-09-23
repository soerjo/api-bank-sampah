import { Injectable } from '@nestjs/common';
import { CreateSampahDto } from './dto/create-sampah.dto';
import { UpdateSampahDto } from './dto/update-sampah.dto';

@Injectable()
export class SampahService {
  create(createSampahDto: CreateSampahDto) {
    return 'This action adds a new sampah';
  }

  findAll() {
    return `This action returns all sampah`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sampah`;
  }

  update(id: number, updateSampahDto: UpdateSampahDto) {
    return `This action updates a #${id} sampah`;
  }

  remove(id: number) {
    return `This action removes a #${id} sampah`;
  }
}
