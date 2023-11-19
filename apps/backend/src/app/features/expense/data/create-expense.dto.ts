import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';

/**
 * The corresponding user id is retrieved from the JWT
 */
export class CreateExpenseDto {
  @IsString()
  name: string;

  @IsNumber()
  amount: number;

  @IsDate()
  date: Date;

  @IsNumber()
  categoryId: number;

  @IsOptional()
  @IsDate()
  createdAt?: Date;
}
