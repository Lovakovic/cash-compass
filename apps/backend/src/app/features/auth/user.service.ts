import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './data/user.entity';
import {CreateUserDto, LoginUserDto} from "./data/user.dto";
import {JwtService} from "@nestjs/jwt";
import {JwtPayload} from "./jwt.strategy";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

	private buildUserResponse(user: User) {
		return {
			id: user.id,
			username: user.username,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt
		};
	}


	async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);

    return this.buildUserResponse(newUser);
  }

	async login(loginUserDto: LoginUserDto) {
		const user = await this.userRepository.findOne({ where: { username: loginUserDto.username }});
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
			user: this.buildUserResponse(user),
		};
	}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({where: { id: Number(id) }});
  }

  async update(id: string, attrs: Partial<User>): Promise<User> {
    await this.userRepository.update(id, attrs);
    const updatedUser = await this.userRepository.findOne({where: { id: Number(id) }});
    if (!updatedUser) {
      throw new Error('user not found');
    }
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('user not found');
    }
  }
}
