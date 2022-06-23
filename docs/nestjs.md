

# nest cli 使用

1. 快速创建文件

```
nest g module auth

# 创建 auth 模块到 modules 目录下
nest g module auth modules
nest g service auth modules
nest g controller auth modules


nest g resources [name] modules
```

## query 类型转化

```
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

/**
 * 列表 DTO
 */
export class BaseListDto {
  @ApiProperty({ description: '分页size' })
  @IsInt()
  @Type(() => Number)
  readonly size: number;

  @ApiProperty({ description: '页码' })
  @IsInt()
  @Type(() => Number)
  readonly page: number;
}


import { ValidationPipe } from '@nestjs/common';
// 处理 query 参数都是 string 类型的问题
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
```