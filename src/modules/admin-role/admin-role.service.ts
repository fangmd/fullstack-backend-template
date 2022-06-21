import { Injectable } from '@nestjs/common';
import { BizException } from 'src/utils/BizException';
import { getSnowId } from 'src/utils/snowid';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateAdminRoleDto,
  QueryAdminRoleDto,
  UpdateAdminRoleDto,
} from './dto/admin-role.dto';
import { ROLE_NAME_EXISTS, ROLE_NOT_EXISTS } from './http-code';

@Injectable()
export class AdminRoleService {
  constructor(private prisma: PrismaService) {}

  /**
   * 创建
   */
  async create(createAdminRoleDto: CreateAdminRoleDto) {
    // 判断 name 是否存在
    const dbRole = await this.prisma.adminRole.findUnique({
      where: {
        name: createAdminRoleDto.name,
      },
    });
    if (dbRole) {
      throw new BizException(ROLE_NAME_EXISTS);
    }

    // 创建角色
    const newRole = await this.prisma.adminRole.create({
      data: {
        id: getSnowId(),
        name: createAdminRoleDto.name,
        permissionIds: createAdminRoleDto.permissionIds,
      },
    });

    return { id: newRole.id, name: newRole.name };
  }

  /**
   * 更新
   */
  async update(editAdminRoleDto: UpdateAdminRoleDto) {
    const { id, ...updateData } = editAdminRoleDto;

    const ret = await this.prisma.adminRole.update({
      where: {
        id: id,
      },
      data: {
        name: updateData.name,
        permissionIds: updateData.permissionIds,
      },
    });
    return ret;
  }

  /**
   * 分页查找
   */
  async findAll(params: QueryAdminRoleDto) {
    const { page = 1, size = 20 } = params;
    const total = await this.prisma.adminRole.count({
      where: {
        isDel: false,
      },
    });
    const ret = await this.prisma.adminRole.findMany({
      skip: (page - 1) * size,
      take: size,
      where: {
        isDel: false,
        name: {
          contains: params.name,
        },
      },
      orderBy: {
        updateTime: 'desc',
      },
      select: {
        id: true,
        name: true,
        permissionIds: true,
        createTime: true,
        updateTime: true,
      },
    });

    // 所有权限id
    const allPermissionIds = ret.reduce((preValue, curValue, value) => {
      const newP = curValue.permissionIds
        ? JSON.parse(curValue.permissionIds)
        : [];
      return preValue.concat(newP);
    }, []);

    // 查所有会用到的权限
    const allPermission = await this.prisma.adminPermission.findMany({
      where: {
        id: {
          in: allPermissionIds.map((i) => BigInt(i)),
        },
      },
    });

    // console.log('ret', ret);

    ret.forEach((i) => {
      if (!i.permissionIds) return '';

      i['permissionNames'] = allPermission
        .filter((i2) => {
          return i.permissionIds.includes(i2.id.toString());
        })
        .reduce((preValue, curValue) => {
          if (!preValue) {
            return curValue.name;
          }
          return `${preValue},${curValue.name}`;
        }, '');
    });
    // console.log('ret', ret);

    return {
      list: ret,
      total,
    };
  }

  async findOne(id: bigint) {
    const ret = this.prisma.adminRole.findUnique({
      where: {
        id: id,
      },
    });
    if (!ret) {
      throw new BizException(ROLE_NOT_EXISTS);
    }
    return ret;
  }
}
