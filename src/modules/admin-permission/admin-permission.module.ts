import { Module } from '@nestjs/common';
import { AdminPermissionController } from '../admin-permission/admin-permission.controller';
import { AdminPermissionService } from '../admin-permission/admin-permission.service';

@Module({
  providers: [AdminPermissionService],
  controllers: [AdminPermissionController],
  exports: [AdminPermissionService],
})
export class AdminPermissionModule {}
