import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { responseSuccess } from 'src/utils/response';
import { AdminUserService } from './admin-user.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { LoginAdminUserDto } from './dto/login-admin-user.dto';

@ApiTags('管理后台用户相关 admin-user')
@Controller('api/admin-user')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @ApiOperation({ summary: '创建用户' })
  @ApiBody({ type: CreateAdminUserDto })
  @HttpCode(200)
  @Post()
  async create(@Body() createAdminUserDto: CreateAdminUserDto) {
    const result = await this.adminUserService.create(createAdminUserDto);
    return responseSuccess({
      url: result,
    });
  }

  @ApiOperation({ summary: '登录' })
  @ApiBody({ type: LoginAdminUserDto })
  @HttpCode(200)
  @Post('/login')
  async findAll(@Body() loginAdminUserDto: LoginAdminUserDto) {
    const result = await this.adminUserService.login(loginAdminUserDto);
    return responseSuccess({
      url: result,
    });
  }
}
