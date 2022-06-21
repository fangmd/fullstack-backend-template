import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Length } from 'class-validator';

/**
 * 创建管理后台用户
 */
export class CreateAdminUserDto {
  /** 用户姓名 */
  @ApiProperty({ description: '用户姓名' })
  @Length(2, 50)
  readonly name: string;
  @ApiProperty({ description: '角色id' })
  @Transform((val) => BigInt(val.value))
  readonly roleId: bigint;
  /** 用户密码 */
  @ApiProperty({ description: '用户密码' })
  @Length(8, 50)
  readonly password: string;
}
