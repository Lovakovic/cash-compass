import { Injectable, OnModuleInit } from "@nestjs/common";
import { User } from "./data/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { CreateUserDto } from "../auth/data/auth.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.ensureAdminUser();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async findOne(options: FindOneOptions<User>): Promise<User | undefined> {
    return this.userRepository.findOne(options);
  }

  async existsByUsername(username: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { username } });
    return !!user;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !!user;
  }

  async ensureAdminUser() {
    const adminUsername = this.configService.get<string>('ADMIN_USERNAME');
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');

    const adminExists = await this.existsByUsername(adminUsername);

    if (!adminExists) {
      const adminUser: CreateUserDto = {
        username: adminUsername,
        password: adminPassword,
        email: adminEmail
      };

      await this.create(adminUser);
    }
  }
}
