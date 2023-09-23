import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSampahDto {
  @IsString()
  @IsNotEmpty()
  @Transform((param) => String(param.value).toUpperCase())
  @ApiProperty({ example: 'kardus' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Transform((param) => String(param.value).toUpperCase())
  @ApiProperty({ example: 'kertas' })
  kategory: string;
}
