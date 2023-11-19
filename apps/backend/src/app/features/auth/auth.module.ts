import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {JwtStrategy} from './passport/jwt.strategy';
import {AuthController} from './auth.controller';
import {JwtAuthGuard} from "./passport/jwt-auth.guard";
import {PassportModule} from "@nestjs/passport";
import {APP_GUARD} from "@nestjs/core";
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "../user/user.module";


@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRY
      }
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
	UserModule,
  ],
  providers: [
    AuthService,
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
