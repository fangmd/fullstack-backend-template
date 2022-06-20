import { Injectable } from '@nestjs/common';
import { BizException } from 'src/utils/BizException';
import { getSnowId } from 'src/utils/snowid';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateAdminRoleDto,
  QueryAdminRoleDto,
  UpdateAdminRoleDto,
} from './dto/admin-role.dto';
import { ROLE_NAME_EXISTS } from './http-code';

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
        permission: createAdminRoleDto.permission,
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
        permission: updateData.permission,
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
        permission: true,
        createTime: true,
        updateTime: true,
      },
    });
    return {
      list: ret,
      total,
    };
  }
}
