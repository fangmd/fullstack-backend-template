import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Length } from 'class-validator';
import { BaseListDto } from 'src/dto/base-list-dto';

/**
 * 创建管理后台角色
 */
export class CreateAdminRoleDto {
  @ApiProperty({ description: '角色名称' })
  @Length(2, 50)
  readonly name: string;
  @ApiProperty({ description: '角色权限JSON' })
  readonly permissionIds?: string;
}

/**
 * 查询管理后台角色
 */
export class QueryAdminRoleDto extends BaseListDto {
  @ApiProperty({ description: '角色名称', required: false })
  readonly name?: string;
}

/**
 * 更新管理后台角色
 */
export class UpdateAdminRoleDto {
  @ApiProperty({ description: '用户id' })
  @Transform((val) => BigInt(val.value))
  readonly id: bigint;
  @ApiProperty({ description: '角色名称' })
  readonly name: string;
  @ApiProperty({ description: '角色权限JSON' })
  readonly permissionIds: string;
}
