import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Balance, Transaction } from '@app/entities';

import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance) private readonly balanceRepository: Repository<Balance>,
    @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
  ) {}

  public async getBalance(id: string): Promise<Balance> {
    return await this.balanceRepository.findOne({ where: { id } });
  }

  public async createBalance(): Promise<Balance> {
    return await this.balanceRepository.save(new Balance({ cash: 200 }));
  }

  public async createTransaction({ from, to, amount }: CreateTransactionDto): Promise<boolean> {
    try {
      await this.balanceRepository.query('START TRANSACTION;');
      await this.balanceRepository.query(`SELECT * FROM balance WHERE "id"='${from}' FOR UPDATE;`);
      await this.balanceRepository.query(`SELECT * FROM balance WHERE "id"='${to}' FOR UPDATE;`);
      // await new Promise((r) => setTimeout(() => r(1), 10000));
      await this.balanceRepository.update({ id: from }, { cash: () => `"cash" - ${amount}` });
      await this.balanceRepository.update({ id: to }, { cash: () => `"cash + ${amount}` });
      await this.transactionRepository.save(new Transaction({ from, to, amount }));
      await this.balanceRepository.query('COMMIT;');
      return true;
    } catch (err) {
      await this.balanceRepository.query('ROLLBACK;');
      return false;
    }
  }
}
