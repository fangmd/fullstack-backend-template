import { AdminPermissionModule } from './../admin-permission/admin-permission.module';
import { AdminRoleModule } from './../admin-role/admin-role.module';
import { Module } from '@nestjs/common';
import { AdminUserService } from './admin-user.service';
import { AdminUserController } from './admin-user.controller';

@Module({
  imports: [AdminRoleModule, AdminPermissionModule],
  controllers: [AdminUserController],
  providers: [AdminUserService],
  exports: [AdminUserService],
})
export class AdminUserModule {}
