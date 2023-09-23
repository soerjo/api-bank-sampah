import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateNasabahDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'soerjo' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'suryo hastomo' })
  fullname: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ example: '087808295838' })
  phone?: string;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({ example: '13' })
  rt: string;

  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({ example: '01' })
  rw: string;
}
