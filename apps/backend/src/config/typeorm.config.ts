import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  url: process.env.DB_URL,
  autoLoadEntities: true,
  synchronize: process.env.TYPEORM_SYNC === 'true'
};
