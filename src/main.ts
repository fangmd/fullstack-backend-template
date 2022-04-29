import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './filters/AllExceptionFilter';
import { ParamsValidationPipe } from './pipes/ParamsValidationPipe';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ParamsValidationPipe()); // 参数错误，直接报错
  app.useGlobalFilters(new AllExceptionFilter()); // 全局错误捕获

  app.useLogger(app.get(Logger)); // logger

  await app.listen(3000);
}

bootstrap();
