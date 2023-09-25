import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';

export class CreateWithdrawTransactionDto {
  @IsString()
  @ApiProperty({ example: '81643e9c-e11c-485f-9f82-77f8aac11737' })
  nasabah_id: string;

  @IsNumber()
  @Type()
  @Min(0)
  @ApiProperty({ example: 2000 })
  withdraw: number;
}
