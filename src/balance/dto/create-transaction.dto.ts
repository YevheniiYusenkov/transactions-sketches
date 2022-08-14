import { IsInt, IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsUUID()
  from: string;

  @IsString()
  @IsUUID()
  to: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  amount: number;
}
