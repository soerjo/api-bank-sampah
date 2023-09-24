import { IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepositTransactionDto {
  @IsString()
  @ApiProperty({ example: '81643e9c-e11c-485f-9f82-77f8aac11737' })
  nasabah_id: string;

  @IsString()
  @ApiProperty({ example: '0c5074d0-a067-4960-9a24-2447df305c9d' })
  sampah_id: string;

  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 3 })
  weight: number;
}
