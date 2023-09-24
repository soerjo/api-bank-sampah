import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CreateDepositTransactionDto } from './dto/create-deposit-transaction.dto';
import { CreateWithdrawTransactionDto } from './dto/create-withdraw-transaction.dto';
import { QueryParamsTransactionDto } from './dto/query-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('/deposit')
  createDeposit(@Body() createDepositTransactionDto: CreateDepositTransactionDto) {
    return this.transactionService.createDeposit(createDepositTransactionDto);
  }

  @Post('/withdraw')
  createWithdraw(@Body() createWithdrawTransactionDto: CreateWithdrawTransactionDto) {
    return this.transactionService.createWithdraw(createWithdrawTransactionDto);
  }

  @Get()
  findAll(@Query() queryParams: QueryParamsTransactionDto) {
    return this.transactionService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(id);
  }
}
