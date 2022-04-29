import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { AdminUserModule } from './modules/admin-user/admin-user.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [LoggerModule.forRoot(), AdminUserModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
