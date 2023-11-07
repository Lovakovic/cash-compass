import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import {Request, Response} from 'express';
import {UserService} from "./user.service";
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
	async login(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Body() loginUserDto: LoginUserDto) {
		const { access_token, user } = await this.userService.login(loginUserDto);

    res.cookie('jwt', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 // 24 hours for example
    });

		return user;
	}

  @Post('logout')
  public logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt', {
      path: '/'
    });
    return { message: 'Logged out successfully' };
  }

  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
