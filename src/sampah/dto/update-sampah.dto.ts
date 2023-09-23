import { PartialType } from '@nestjs/mapped-types';
import { CreateSampahDto } from './create-sampah.dto';

export class UpdateSampahDto extends PartialType(CreateSampahDto) {}
