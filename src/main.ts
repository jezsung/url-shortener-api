import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const env = configService.get<'development' | 'production'>('NODE_ENV');
  const port = configService.get<number>('PORT');

  app.enableCors({
    origin: env === 'production' ? 'same-origin' : '*',
    credentials: false,
  });

  await app.listen(port);
}
bootstrap();
