import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class UpdateSampahDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'kardus' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'kertas' })
  kategory: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @ApiProperty({ example: 3000 })
  price: number;
}
