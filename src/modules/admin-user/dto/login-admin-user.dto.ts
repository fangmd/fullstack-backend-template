import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

/**
 * 登录管理后台用户
 */
export class LoginAdminUserDto {
  /** 用户姓名 */
  @ApiProperty({ description: '用户姓名' })
  @Length(2, 50)
  readonly name: string;
  /** 用户密码 */
  @ApiProperty({ description: '用户密码' })
  @Length(8, 50)
  readonly password: string;
}
