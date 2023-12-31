import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQL_ADDRESS,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  autoLoadEntities: true,
  synchronize: process.env.TYPEORM_SYNC === 'true',
};
