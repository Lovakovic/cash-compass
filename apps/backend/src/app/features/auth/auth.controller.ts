import {Controller, Post, Body, Get, UseGuards, Req, Res} from '@nestjs/common';
import { Request, Response } from 'express';
import {UserService} from "./user.service";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {CreateUserDto, LoginUserDto} from "./data/user.dto";
import {Public} from "./public.decorator";

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) response: Response) {
    const { access_token } = await this.userService.login(loginUserDto);
    response.cookie('jwt', access_token, { httpOnly: true });
    return { message: 'Success' };
  }

  @Post('logout')
  @Public()
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return { message: 'Logged out successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
