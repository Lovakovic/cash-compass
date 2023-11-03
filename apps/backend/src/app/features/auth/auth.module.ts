import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {JwtStrategy} from './jwt.strategy';
import {AuthController} from './auth.controller';
import {JwtAuthGuard} from "./jwt-auth.guard";
import {PassportModule} from "@nestjs/passport";
import {ConfigModule} from "../../config/config.module";
import {APP_GUARD} from "@nestjs/core";
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./data/user.schema";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ConfigModule,
  ],
  providers: [
    UserService,
    JwtStrategy,
    JwtAuthGuard,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
