import { DeleteDto } from './../../dto/delete-dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/jwt/jwt_auth.guard';
import { responseSuccess } from 'src/utils/response';
import { AdminPermissionService } from './admin-permission.service';
import {
  QueryAdminPermissionDto,
  CreateAdminPermissionDto,
  UpdateAdminPermissionDto,
} from './dto/admin-Permission.dto';

@ApiTags('管理后台权限/菜单admin-permission')
@Controller('/api/admin-permission')
@UseGuards(JwtAuthGuard)
@ApiHeaders([{ name: 'auth' }])
export class AdminPermissionController {
  constructor(
    private readonly adminPermissionService: AdminPermissionService,
  ) {}

  @ApiOperation({ summary: '获取权限/菜单列表' })
  @Get('list')
  async list(@Query() listDto: QueryAdminPermissionDto) {
    const result = await this.adminPermissionService.findAll(listDto);
    return responseSuccess({
      ...result,
    });
  }

  @ApiOperation({ summary: '创建权限/菜单' })
  @HttpCode(200)
  @Post()
  async create(@Body() createAdminPermissionDto: CreateAdminPermissionDto) {
    const result = await this.adminPermissionService.create(
      createAdminPermissionDto,
    );
    return responseSuccess({
      url: result,
    });
  }

  /**
   * 删除权限/菜单
   */
  @ApiOperation({ summary: '删除权限/菜单' })
  @Delete()
  async delete(@Body() delDto: DeleteDto) {
    const result = await this.adminPermissionService.delete(delDto);
    return responseSuccess({
      url: result,
    });
  }

  /**
   * 修改权限/菜单
   */
  @ApiOperation({ summary: '修改权限/菜单' })
  @Put()
  async edit(@Body() editAdminPermissionDto: UpdateAdminPermissionDto) {
    await this.adminPermissionService.update(editAdminPermissionDto);
    return responseSuccess();
  }
}
