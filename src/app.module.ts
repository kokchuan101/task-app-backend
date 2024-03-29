import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchModule } from './search/search.module';
import { TaskModule } from './task/task.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            autoLoadEntities: true,
            synchronize: true,
        }),
        TaskModule,
        SearchModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
