import { ROLE_NOT_EXISTS } from './../admin-role/http-code';
import { Injectable } from '@nestjs/common';
import { DeleteDto } from 'src/dto/delete-dto';
import { BizException } from 'src/utils/BizException';
import { getSnowId } from 'src/utils/snowid';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateAdminPermissionDto,
  QueryAdminPermissionDto,
  UpdateAdminPermissionDto,
} from './dto/admin-Permission.dto';
import { PERMISSION_NAME_EXISTS } from './http-code';

@Injectable()
export class AdminPermissionService {
  constructor(private prisma: PrismaService) {}

  /**
   * 创建
   */
  async create(createAdminPermissionDto: CreateAdminPermissionDto) {
    // 判断 name 是否存在
    const dbPermission = await this.prisma.adminPermission.findUnique({
      where: {
        name: createAdminPermissionDto.name,
      },
    });
    if (dbPermission) {
      throw new BizException(PERMISSION_NAME_EXISTS);
    }

    // 创建角色
    const newPermission = await this.prisma.adminPermission.create({
      data: {
        id: getSnowId(),
        parentId: createAdminPermissionDto.parentId,
        name: createAdminPermissionDto.name,
        icon: createAdminPermissionDto.icon,
        componentPath: createAdminPermissionDto.componentPath,
        urlPath: createAdminPermissionDto.urlPath,
        roleType: createAdminPermissionDto.roleType,
        enable: createAdminPermissionDto.enable,
        menuVisible: createAdminPermissionDto.menuVisible,
        index: createAdminPermissionDto.index,
      },
    });

    return { id: newPermission.id, name: newPermission.name };
  }

  async delete(delDto: DeleteDto) {
    const ret = await this.prisma.adminPermission.updateMany({
      where: {
        id: {
          in: delDto.ids,
        },
      },
      data: {
        isDel: true,
      },
    });
    return ret;
  }

  /**
   * 更新
   */
  async update(editAdminPermissionDto: UpdateAdminPermissionDto) {
    const { id, ...updateData } = editAdminPermissionDto;

    const ret = await this.prisma.adminPermission.update({
      where: {
        id: id,
      },
      data: {
        name: editAdminPermissionDto.name,
        icon: editAdminPermissionDto.icon,
        componentPath: editAdminPermissionDto.componentPath,
        urlPath: editAdminPermissionDto.urlPath,
        roleType: editAdminPermissionDto.roleType,
        enable: editAdminPermissionDto.enable,
        menuVisible: editAdminPermissionDto.menuVisible,
        index: editAdminPermissionDto.index,
      },
    });
    return ret;
  }

  /**
   * 管理后台菜单不做分页
   */
  async findAll() {
    const total = await this.prisma.adminPermission.count({
      where: {
        isDel: false,
      },
    });
    const ret = await this.prisma.adminPermission.findMany({
      where: {
        isDel: false,
      },
      orderBy: {
        index: 'asc',
      },
    });
    const nodeArr = ret.filter((i) => i.parentId === null);
    this.mergeChildren(nodeArr, ret);

    return {
      list: nodeArr,
      total,
    };
  }

  mergeChildren(nodeArr: any[], rawData: any[]) {
    if (!nodeArr) return;
    nodeArr.forEach((i) => {
      i.children = rawData.filter((i2) => i2.parentId === i.id);
      if (i.children.length === 0) {
        delete i.children;
      }
      this.mergeChildren(i.children, rawData);
    });
  }
}
