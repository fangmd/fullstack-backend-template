import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

/**
 * 列表 DTO
 */
export class BaseListDto {
  @ApiProperty({ description: '分页size', required: true })
  @IsInt()
  @Type(() => Number)
  readonly size: number;

  @ApiProperty({ description: '页码', required: true })
  @IsInt()
  @Type(() => Number)
  readonly page: number;
}
