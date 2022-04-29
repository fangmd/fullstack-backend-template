import { Module } from '@nestjs/common';
import { AdminUserService } from './admin-user.service';
import { AdminUserController } from './admin-user.controller';

@Module({
  imports: [],
  controllers: [AdminUserController],
  providers: [AdminUserService],
})
export class AdminUserModule {}
