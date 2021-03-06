import { Module } from '@nestjs/common';
import { AdminRoleService } from './admin-role.service';
import { AdminRoleController } from './admin-role.controller';

@Module({
  controllers: [AdminRoleController],
  providers: [AdminRoleService],
  exports: [AdminRoleService],
})
export class AdminRoleModule {}
