import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { addSwagger } from './app/config/swagger.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const PORT = configService.get<number>('PORT');
  app.useGlobalPipes(new ValidationPipe());
  addSwagger(app);
  await app.listen(PORT, () => {
    console.warn(`App is listening on ${PORT}`);
  });
}
bootstrap();
