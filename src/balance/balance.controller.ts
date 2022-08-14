import { Controller, Get, Param, Post, Body } from '@nestjs/common';

import { BalanceService } from './balance.service';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Balance } from '@app/entities';

@Controller('balance')
export class BalanceController {
  constructor(private readonly service: BalanceService) {}

  @Get(':id')
  public async getBalance(@Param() { id }): Promise<Balance> {
    return await this.service.getBalance(id);
  }

  @Post('')
  public async createBalance(): Promise<Balance> {
    return await this.service.createBalance();
  }

  @Post('transaction')
  public async createTransaction(@Body() dto: CreateTransactionDto) {
    return await this.service.createTransaction(dto);
  }

  @Get('history')
  public async getHistory() {
    return;
  }
}
