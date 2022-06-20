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
import { AdminRoleService } from './admin-role.service';
import {
  CreateAdminRoleDto,
  QueryAdminRoleDto,
  UpdateAdminRoleDto,
} from './dto/admin-role.dto';

@ApiTags('管理后台角色admin-role')
@Controller('/api/admin-role')
@UseGuards(JwtAuthGuard)
@ApiHeaders([{ name: 'auth' }])
export class AdminRoleController {
  constructor(private readonly adminRoleService: AdminRoleService) {}

  @ApiOperation({ summary: '获取角色列表' })
  @Get('list')
  async list(@Query() listDto: QueryAdminRoleDto) {
    const result = await this.adminRoleService.findAll(listDto);
    return responseSuccess({
      ...result,
    });
  }

  @ApiOperation({ summary: '创建角色' })
  @HttpCode(200)
  @Post()
  async create(@Body() createAdminRoleDto: CreateAdminRoleDto) {
    const result = await this.adminRoleService.create(createAdminRoleDto);
    return responseSuccess({
      url: result,
    });
  }

  /**
   * 删除角色
   */
  @ApiOperation({ summary: '删除角色' })
  @Delete()
  async delete() {
    return responseSuccess();
  }

  /**
   * 修改角色
   */
  @ApiOperation({ summary: '修改角色' })
  @Put()
  async edit(@Body() editAdminRoleDto: UpdateAdminRoleDto) {
    await this.adminRoleService.update(editAdminRoleDto);
    return responseSuccess();
  }
}
