import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthentificationModule } from './authentification/authentification.module';
import { PersonneModule } from './personne/personne.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    AuthentificationModule,
    PersonneModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_ADDON_HOST,
      port: +process.env.MYSQL_ADDON_PORT,
      username: process.env.MYSQL_ADDON_USER,
      password: process.env.MYSQL_ADDON_PASSWORD,
      database: process.env.MYSQL_ADDON_DB,
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
