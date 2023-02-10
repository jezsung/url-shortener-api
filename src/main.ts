import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const env = configService.get<'development' | 'production'>('NODE_ENV');
  const port = configService.get<number>('PORT');
  const corsDomain = configService.get<string>('CORS_DOMAIN');

  app.enableCors({
    origin: env === 'production' ? corsDomain : '*',
    credentials: false,
  });

  await app.listen(port);
}
bootstrap();
