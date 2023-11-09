import {IsEmail, IsOptional, IsString, MinLength} from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}

export class LoginUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
