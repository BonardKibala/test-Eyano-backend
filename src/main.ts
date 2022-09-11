import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);

  // const corsOptions = {
  //   origin: ['http://localhost:3000', 'http://localhost:3001'],
  // };
  // app.enableCors(corsOptions);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Test')
    .setDescription('CRUD')
    .setVersion('1.0')
    .build();

  const doc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('doc', app, doc);

  app.use(morgan('dev'));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //transformer les paramettre en type de données souhaité
      whitelist: true, //Ne récupérer que les paramettre définie dans les validateurs
      forbidNonWhitelisted: true, //déclancher l'érreur s'il y a des paramettres non souhaité
    }),
  );

  await app.listen(process.env.PORT, () => {
    console.log(
      'Server run 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥',
    );
  });
}
bootstrap();
