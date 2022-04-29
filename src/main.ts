import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './filters/AllExceptionFilter';
import { ParamsValidationPipe } from './pipes/ParamsValidationPipe';
import { Logger } from 'nestjs-pino';
import { PrismaService } from './modules/prisma/prisma.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ParamsValidationPipe()); // 参数错误，直接报错
  app.useGlobalFilters(new AllExceptionFilter()); // 全局错误捕获

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.useLogger(app.get(Logger)); // logger

  const config = new DocumentBuilder()
    .setTitle('Node Api')
    .setDescription('Node Api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}

bootstrap();
