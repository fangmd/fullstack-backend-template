

## 基本安装

- `pnpm add -D prisma`
- `pnpm add @prisma/client`



## 命令

- 初始化 prisma 配置, `npx prisma init`
- 创建一个数据库 migrate `npx prisma migrate dev --name init`
- 直接更新数据库(建模时期使用，正常开发流程中不要用) `npx prisma db push`
