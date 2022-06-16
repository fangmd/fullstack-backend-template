import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateAdminUserDto {
  /** 用户id */
  @ApiProperty({ description: '用户id' })
  @Transform((val) => BigInt(val.value))
  readonly id: bigint;
  /** 用户姓名 */
  @ApiProperty({ description: '用户姓名' })
  readonly name: string;
  /** 用户密码 */
  @ApiProperty({ description: '用户密码' })
  readonly password: string;
}
