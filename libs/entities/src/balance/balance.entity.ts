import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'balance' })
export class Balance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'cash', type: 'int4', nullable: false })
  cash: number;

  @CreateDateColumn({ name: 'createdAt', nullable: false })
  createdAt: Date;

  public constructor(init: Pick<Balance, 'cash'>) {
    Object.assign(this, init);
  }
}
