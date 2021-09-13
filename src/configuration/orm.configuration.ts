import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const configuration : TypeOrmModuleOptions = {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'nestjs',
    autoLoadEntities: true,
    synchronize: true
};