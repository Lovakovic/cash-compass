import {Module} from '@nestjs/common';
import {ExpenseService} from './expense.service';
import {ExpenseController} from './expense.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Expense} from "./data/expense.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Expense])
  ],
  providers: [ExpenseService],
  controllers: [ExpenseController],
})
export class ExpenseModule {}
