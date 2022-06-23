import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Get,
  Delete,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { ApiBody, ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IDDto } from 'src/dto/id-dto';
import { JwtAuthGuard } from 'src/guard/jwt/jwt_auth.guard';
import { responseSuccess } from 'src/utils/response';
import { AdminUserService } from './admin-user.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { LoginAdminUserDto } from './dto/login-admin-user.dto';
import { QueryAdminUserDto } from './dto/query-admin-user.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';

@ApiTags('管理后台用户相关 admin-user')
@Controller('api/admin-user')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @ApiOperation({ summary: '登录' })
  @ApiBody({ type: LoginAdminUserDto })
  @HttpCode(200)
  @Post('/login')
  async findAll(@Body() loginAdminUserDto: LoginAdminUserDto) {
    const result = await this.adminUserService.login(loginAdminUserDto);
    return responseSuccess({
      ...result,
    });
  }

  @ApiOperation({ summary: '获取用户列表' })
  @ApiHeaders([{ name: 'auth' }])
  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list(@Query() listDto: QueryAdminUserDto) {
    const result = await this.adminUserService.findAll(listDto);
    return responseSuccess({
      ...result,
    });
  }

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

  /**
   * 删除用户
   */
  @ApiOperation({ summary: '删除用户' })
  @ApiHeaders([{ name: 'auth' }])
  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete() {
    return responseSuccess();
  }

  /**
   * 修改用户
   */
  @ApiOperation({ summary: '修改用户' })
  @ApiHeaders([{ name: 'auth' }])
  @UseGuards(JwtAuthGuard)
  @Put()
  async edit(@Body() editAdminUserDto: UpdateAdminUserDto) {
    console.log('edit');
    await this.adminUserService.update(editAdminUserDto);
    return responseSuccess();
  }

  /**
   * 查询单个用户信息
   */
  @ApiOperation({ summary: '查询用户信息' })
  @ApiHeaders([{ name: 'auth' }])
  @UseGuards(JwtAuthGuard)
  @Get()
  async query() {
    return responseSuccess();
  }

  /**
   * 获取用户所有权限
   */
  @ApiOperation({ summary: '获取用户所有权限/菜单' })
  @ApiHeaders([{ name: 'auth' }])
  @UseGuards(JwtAuthGuard)
  @Get('permission')
  async userPermission(@Request() req: any) {
    const result = await this.adminUserService.getUserPermissions(req.user.id);
    return responseSuccess({
      ...result,
    });
  }
}
