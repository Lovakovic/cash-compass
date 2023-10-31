import {Controller, Post, Body, Get, UseGuards, Req, Res} from '@nestjs/common';
import { Request, Response } from 'express';
import {UserService} from "./user.service";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {CreateUserDto, LoginUserDto} from "./data/user.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) response: Response) {
    const { access_token } = await this.userService.login(loginUserDto);
    response.cookie('jwt', access_token, { httpOnly: true });
    return { message: 'Success' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
