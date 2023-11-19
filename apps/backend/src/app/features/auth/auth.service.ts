import {ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {CreateUserDto, LoginUserDto} from "./data/auth.dto";
import {JwtService} from "@nestjs/jwt";
import {JwtPayload} from "./passport/jwt.strategy";
import {UserService} from "../user/user.service";
import {mapUserToDto} from "../user/data/user.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

	async login(loginUserDto: LoginUserDto) {
		const user = await this.userService.findOne({ where: { username: loginUserDto.username }});
		if (!user) {
			throw new UnauthorizedException('User not found');
		}

		const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
		if (!isMatch) {
			throw new UnauthorizedException('Incorrect password');
		}

		const payload: JwtPayload = { username: user.username, sub: user.id.toString() };
		const accessToken = this.jwtService.sign(payload);

		return {
			access_token: accessToken,
			user: mapUserToDto(user)
		};
	}

  async register(createUserDto: CreateUserDto) {
    const { username, email } = createUserDto;


    const usernameExists = await this.userService.existsByUsername(username);
    if (usernameExists) {
      throw new ConflictException('Username already exists');
    }

    const emailExists = await this.userService.existsByEmail(email);
    if (emailExists) {
      throw new ConflictException('Email already exists');
    }

    // Proceed with user creation
    const newUser = await this.userService.create(createUserDto);
    return mapUserToDto(newUser);
  }

  public static convertToMilliseconds(expiry: string): number {
    const time = parseInt(expiry.slice(0, -1), 10);
    const unit = expiry.slice(-1);

    switch (unit) {
      case 's':
        return time * 1000;
      case 'm':
        return time * 1000 * 60;
      case 'h':
        return time * 1000 * 60 * 60;
      case 'd':
        return time * 1000 * 60 * 60 * 24;
      default:
        throw new Error(`Unsupported time format: ${expiry}`);
    }
  }
}
