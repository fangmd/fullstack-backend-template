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
import { IDDto } from 'src/dto/id-dto';

@Injectable()
export class AdminUserService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
    private adminRoleService: AdminRoleService,
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
   * 获取用户权限
   */
  async getUserPermissions(idDto: IDDto) {
    const user = await this.findOne(idDto.id);

    const adminRole = await this.adminRoleService.findOne(user.roleId);

    return adminRole;
  }
}
