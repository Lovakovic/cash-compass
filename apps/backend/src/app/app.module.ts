import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ExpenseModule} from './features/expense/expense.module';
import {CategoryModule} from './features/category/category.module';
import {AuthModule} from './features/auth/auth.module';
import {typeOrmConfig} from "../config/typeorm.config";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ExpenseModule,
    CategoryModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
