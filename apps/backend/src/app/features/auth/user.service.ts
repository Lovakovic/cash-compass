import {Injectable, UnauthorizedException} from '@nestjs/common';
import UserModel from "./data/user.schema";
import {User} from "./data/user.model";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {CreateUserDto, LoginUserDto} from "./data/user.dto";
import {ConfigService} from "../../config/config.service";
import {JwtPayload} from "./jwt.strategy";

@Injectable()
export class UserService {
  constructor(private configService: ConfigService) {
  }

  async create(user: CreateUserDto) {
    try {
      console.log('Creating user:', user);
      const newUser = new UserModel(user);
      const result = await newUser.save();
      console.log('User created:', result);
      return result.toObject() as User;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await UserModel.findOne({ username: loginUserDto.username }).exec();
    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username, sub: user._id } as JwtPayload;
    const accessToken = jwt.sign(payload, this.configService.jwtSecret, {
      expiresIn: this.configService.jwtExpiry,
    });

    return {
      access_token: accessToken,
      user: user.toObject(),
    };
  }

  async findAll(): Promise<User[]> {
    const result = await UserModel.find().exec();
    return result.map(doc => doc.toObject() as User);
  }

  async findOne(id: string): Promise<User | null> {
    const result = await UserModel.findById(id).exec();
    return result ? result.toObject() as User : null;
  }

  async update(id: string, user: User): Promise<User> {
    const result = await UserModel.findByIdAndUpdate(id, user, {new: true}).exec();
    return result ? result.toObject() as User : null;
  }

  async delete(id: string): Promise<User> {
    const result = await UserModel.findByIdAndRemove(id).exec();
    return result ? result.toObject() as User : null;
  }
}
