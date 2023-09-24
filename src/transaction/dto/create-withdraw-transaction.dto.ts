import { IsNumber, IsString, Min } from 'class-validator';

export class CreateWithdrawTransactionDto {
  @IsString()
  nasabah_id: string;

  @IsNumber()
  @Min(0)
  withdraw: number;
}
