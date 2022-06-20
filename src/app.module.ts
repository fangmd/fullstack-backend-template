import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { AdminUserModule } from './modules/admin-user/admin-user.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminRoleModule } from './modules/admin-role/admin-role.module';
import { AdminPermissionModule } from './modules/admin-permission/admin-permission.module';

@Module({
  imports: [
    LoggerModule.forRoot(),
    AdminUserModule,
    PrismaModule,
    AuthModule,
    AdminRoleModule,
    AdminPermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
