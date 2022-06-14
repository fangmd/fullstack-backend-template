import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { BaseListDto } from 'src/dto/base-list-dto';

/**
 * 查询管理后台用户
 */
export class QueryAdminUserDto extends BaseListDto {
  /** 用户姓名 */
  @ApiProperty({ description: '用户姓名' })
  readonly name?: string;
}
