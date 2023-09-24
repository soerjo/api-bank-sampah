import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsNumberString, IsDateString, IsNumber, Min, IsEnum } from 'class-validator';
import { EtransactionType } from '../entities/transaction.entity';

export class QueryParamsTransactionDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  nasabah_id?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  search?: string;

  @IsEnum(EtransactionType)
  @IsOptional()
  @ApiProperty({ required: false, enum: EtransactionType })
  transaction_type?: EtransactionType;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false })
  price_more_than?: number;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false })
  price_less_than?: number;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false })
  weight_more_than?: number;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false })
  weight_less_than?: number;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false })
  date_start?: Date;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false })
  date_end?: Date;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @ApiProperty({ required: false })
  @Transform((property) => parseInt(property.value))
  page?: number = 1;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @ApiProperty({ required: false })
  @Transform((property) => parseInt(property.value))
  limit?: number = 5;
}
