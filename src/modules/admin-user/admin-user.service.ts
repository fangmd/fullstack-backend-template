import { getSnowId } from './../../utils/snowid';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BizException } from 'src/utils/BizException';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';
import { PWD_IS_ERROR, USER_NAME_EXISTS, USER_NOT_EXISTS } from './http-code';
import { LoginAdminUserDto } from './dto/login-admin-user.dto';
import MD5Utils from 'src/utils/md5';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AdminUserService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
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

  findAll(params: {
    // skip?: number;
    // take?: number;
    // cursor?: Prisma.UserWhereUniqueInput;
    // where?: Prisma.UserWhereInput;
    // orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    // const { skip, take, cursor, where, orderBy } = params;
    // const ret = this.prisma.adminUser.findMany({
    //   skip,
    //   take,
    //   cursor,
    //   where,
    //   orderBy,
    // });
    // console.log(ret);
    // return ret;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminUser`;
  }

  update(id: number, updateAdminUserDto: UpdateAdminUserDto) {
    return `This action updates a #${id} adminUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminUser`;
  }
}
