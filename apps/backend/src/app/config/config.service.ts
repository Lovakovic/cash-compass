import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  get jwtSecret(): string {
    return process.env.JWT_SECRET || '';
  }

  get jwtExpiry(): string {
    return process.env.JWT_EXPIRY || '1h';
  }
}
