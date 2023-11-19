import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import {Request, Response} from 'express';
import {AuthService} from "./auth.service";
import {CreateUserDto, LoginUserDto} from "./data/user.dto";
import {Public} from "./passport/public.decorator";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Public()
  @Post('login')
	async login(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Body() loginUserDto: LoginUserDto) {
		const { access_token, user } = await this.authService.login(loginUserDto);

    res.cookie('jwt', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: this.authService.convertToMilliseconds(process.env.JWT_EXPIRY)
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
