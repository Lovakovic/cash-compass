import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {JwtStrategy} from './jwt.strategy';
import {AuthController} from './auth.controller';
import {JwtAuthGuard} from "./jwt-auth.guard";
import {PassportModule} from "@nestjs/passport";
import {APP_GUARD} from "@nestjs/core";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./data/user.entity";
import {JwtModule} from "@nestjs/jwt";


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRY
      }
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
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
