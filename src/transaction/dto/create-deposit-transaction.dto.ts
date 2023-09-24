import { IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepositTransactionDto {
  @IsString()
  @ApiProperty({ example: '81643e9c-e11c-485f-9f82-77f8aac11737' })
  nasabah_id: string;

  @IsString()
  @ApiProperty({ example: 'bfa8391e-e266-40a6-807f-695ee7f863a7' })
  sampah_id: string;

  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 3 })
  weight: number;
}
