import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonneEntity } from './entities/personne.entity';
import { PersonneController } from './personne.controller';
import { PersonneService } from './personne.service';
import * as dotenv from 'dotenv';
import { JwtStrategy } from 'src/authentification/strategy/passport-client-jwt.strategy';
import { IfUserExistMiddleware } from 'src/middlewares/if-personne-exist.middleware';

dotenv.config();
console.log(process.env.SECRET);
@Module({
  imports: [
    TypeOrmModule.forFeature([PersonneEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [PersonneService, JwtStrategy],
  controllers: [PersonneController],
})
export class PersonneModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IfUserExistMiddleware)
      .forRoutes({ path: 'user/register/*', method: RequestMethod.POST });
  }
}
