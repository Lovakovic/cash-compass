import {Module} from '@nestjs/common';
import {ExpenseService} from './expense.service';
import {ExpenseController} from './expense.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ExpenseSchema} from "./expense.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Expense', schema: ExpenseSchema }])],
  providers: [ExpenseService],
  controllers: [ExpenseController],
})
export class ExpenseModule {}