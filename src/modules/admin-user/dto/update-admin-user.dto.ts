import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { CreateAdminUserDto } from './create-admin-user.dto';

export class UpdateAdminUserDto extends CreateAdminUserDto {
  /** 用户id */
  @ApiProperty({ description: '用户id' })
  @Transform((val) => BigInt(val.value))
  readonly id: bigint;
}
