import { Module } from '@nestjs/common';
import {environment} from "@cash-compass/environments";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ExpenseModule} from "../features/expense/expense.module";
import {CategoryModule} from "../features/category/category.module";

const {mongodbUri} = environment;

@Module({
  imports: [
    MongooseModule.forRoot(mongodbUri),
    ExpenseModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
