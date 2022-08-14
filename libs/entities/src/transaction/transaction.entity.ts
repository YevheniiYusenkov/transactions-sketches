import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'transaction' })
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'from' })
  from: string;

  @Column({ type: 'uuid', name: 'to' })
  to: string;

  @Column({ type: 'int4', name: 'amount' })
  amount: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  public constructor(init: Pick<Transaction, 'from' | 'to' | 'amount'>) {
    Object.assign(this, init);
  }
}
