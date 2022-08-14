import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Balance, Transaction } from '@app/entities';

import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Balance, Transaction])],
  providers: [BalanceService],
  controllers: [BalanceController],
})
export class BalanceModule {}
