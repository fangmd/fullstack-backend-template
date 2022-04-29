
## Install

```
pnpm add swagger-ui-express @nestjs/swagger
```


## 用法

1. 接口名称

```
@ApiOperation({ summary: '创建用户' })
```

2. POST 参数

```
@ApiBody({ type: CreateAdminUserDto })
```

3. GET 请求参数

```
@ApiQuery({ type: CaptureDto })
```

4. 参数 field 描述, 加在 Dto field 上

```
@ApiProperty({ description: '用户姓名' })
```