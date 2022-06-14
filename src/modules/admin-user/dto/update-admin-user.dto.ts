import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Length } from 'class-validator';

export class UpdateAdminUserDto {
  /** 用户id */
  @ApiProperty({ description: '用户id' })
  @Transform((val) => BigInt(val.value))
  readonly id: bigint;
  /** 用户姓名 */
  @ApiProperty({ description: '用户姓名' })
  @Length(2, 50)
  readonly name: string;
  /** 用户密码 */
  @ApiProperty({ description: '用户密码' })
  @Length(8, 50)
  readonly password: string;
}
