import { AdminRoleService } from './../admin-role/admin-role.service';
import { getSnowId } from './../../utils/snowid';
import { Injectable } from '@nestjs/common';
import { BizException } from 'src/utils/BizException';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';
import { PWD_IS_ERROR, USER_NAME_EXISTS, USER_NOT_EXISTS } from './http-code';
import { LoginAdminUserDto } from './dto/login-admin-user.dto';
import MD5Utils from 'src/utils/md5';
import { AuthService } from '../auth/auth.service';
import { QueryAdminUserDto } from './dto/query-admin-user.dto';
import { AdminPermissionService } from '../admin-permission/admin-permission.service';
import { AdminPermission } from '@prisma/client';

@Injectable()
export class AdminUserService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
    private adminRoleService: AdminRoleService,
    private adminPermissionService: AdminPermissionService,
  ) {}

  /**
   * 创建管理后台用户
   */
  async create(createAdminUserDto: CreateAdminUserDto) {
    // 判断 name 是否存在
    const dbUser = await this.prisma.adminUser.findUnique({
      where: {
        name: createAdminUserDto.name,
      },
    });
    if (dbUser) {
      throw new BizException(USER_NAME_EXISTS);
    }

    // 创建用户
    const newUser = await this.prisma.adminUser.create({
      data: {
        id: getSnowId(),
        name: createAdminUserDto.name,
        password: MD5Utils.hashStr(createAdminUserDto.password),
      },
    });

    return { id: newUser.id, name: newUser.name };
  }

  async update(editAdminUserDto: UpdateAdminUserDto) {
    const { id, password, ...updateData } = editAdminUserDto;

    if (password) {
      updateData['password'] = password;
    }

    const ret = await this.prisma.adminUser.update({
      where: {
        id: id,
      },
      data: {
        roleId: updateData.roleId,
        name: updateData.name,
        password: editAdminUserDto.password,
      },
    });
    // console.log(ret);
    return ret;
  }

  /**
   * 登录
   */
  async login(loginAdminUserDto: LoginAdminUserDto) {
    // 判断用户是否存在
    const dbUser = await this.prisma.adminUser.findUnique({
      where: {
        name: loginAdminUserDto.name,
      },
    });
    if (!dbUser) {
      throw new BizException(USER_NOT_EXISTS);
    }

    // 判断密码是否正确
    if (MD5Utils.hashStr(loginAdminUserDto.password) != dbUser.password) {
      throw new BizException(PWD_IS_ERROR);
    }

    // gen token
    const token = this.authService.certificate({
      name: dbUser.name,
      id: dbUser.id,
    });

    return { id: dbUser.id, name: dbUser.name, token: token };
  }

  async findAll(params: QueryAdminUserDto) {
    const { page = 1, size = 20 } = params;
    const total = await this.prisma.adminUser.count({
      where: {
        isDel: false,
      },
    });
    const ret = await this.prisma.adminUser.findMany({
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
        roleId: true,
        createTime: true,
        updateTime: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });
    ret.forEach((i) => {
      i['roleName'] = i.role.name;
      delete i.role;
    });
    // console.log('ret', ret);
    return {
      list: ret,
      total,
    };
  }

  async findOne(id: bigint) {
    const ret = this.prisma.adminUser.findUnique({
      where: {
        id: id,
      },
    });
    if (!ret) {
      throw new BizException(USER_NOT_EXISTS);
    }
    return ret;
  }

  remove(id: number) {
    return `This action removes a #${id} adminUser`;
  }

  /**
   * 获取用户所有权限
   */
  async getUserPermissions(id: string) {
    const user = await this.findOne(BigInt(id));

    const adminRole = await this.adminRoleService.findOne(user.roleId);
    if (!adminRole.permissionIds) {
      return [];
    }
    const allPermissions = await this.adminPermissionService.findAll();
    const myPermissions = this.filterPermissions(
      allPermissions.list,
      JSON.parse(adminRole.permissionIds),
    );

    return myPermissions;
  }

  /**
   * 获取有权限的节点和有子权限的节点
   * 由于 Tree 组件的特点，只有部分子权限有权限的时候父权限checked=false也就是没有权限的
   */
  filterPermissions(allPs: AdminPermission[], permissionIds: string[]) {
    return allPs.filter((i) => {
      if (i['children']) {
        i['children'] = this.filterPermissions(i['children'], permissionIds);
        return i['children'].length > 0; // 子权限>0的时候，默认认为拥有父权限
      } else {
        return permissionIds.includes(i.id.toString());
      }
    });
  }
}
