import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Length } from 'class-validator';
import { RoleType } from 'src/constants/enum';
import { BaseListDto } from 'src/dto/base-list-dto';

/**
 * 创建管理后台权限
 */
export class CreateAdminPermissionDto {
  @ApiProperty({ description: '父节点id' })
  @Transform((val) => {
    if (val.value) {
      return BigInt(val.value);
    }
    return undefined;
  })
  readonly parentId?: bigint;
  @ApiProperty({ description: '权限名称' })
  @Length(2, 50)
  readonly name: string;
  @ApiProperty({ description: '图标' })
  readonly icon?: string;
  @ApiProperty({ description: '组件地址' })
  readonly componentPath?: string;
  @ApiProperty({ description: '页面 url' })
  readonly urlPath?: string;
  @ApiProperty({ description: '角色类型' })
  @Transform((val) => (val.value === 1 ? RoleType.MENU : RoleType.OTHER))
  readonly roleType?: RoleType;
  @ApiProperty({ description: '是否开启' })
  readonly enable?: boolean;
  @ApiProperty({ description: '菜单是否显示' })
  readonly menuVisible?: boolean;
  @ApiProperty({ description: '排序' })
  readonly index?: number;
}

/**
 * 查询管理后台权限
 */
export class QueryAdminPermissionDto extends BaseListDto {
  @ApiProperty({ description: '权限名称', required: false })
  readonly name?: string;
}

/**
 * 更新管理后台权限
 */
export class UpdateAdminPermissionDto extends CreateAdminPermissionDto {
  @ApiProperty({ description: 'id' })
  @Transform((val) => BigInt(val.value))
  readonly id: bigint;
}
