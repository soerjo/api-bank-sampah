import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsNumberString, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class QueryParamsDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  search?: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false })
  balance_more_than?: number;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false })
  balance_less_than?: number;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false })
  transaction_more_than?: number;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false })
  transaction_less_than?: number;

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
