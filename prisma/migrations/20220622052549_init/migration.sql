-- AlterTable
ALTER TABLE `admin_user` ADD COLUMN `is_del` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `roleId` BIGINT NULL;

-- CreateTable
CREATE TABLE `admin_role` (
    `id` BIGINT NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `permissionIds` VARCHAR(10000) NULL,
    `is_del` BOOLEAN NOT NULL DEFAULT false,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admin_role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin_permission` (
    `id` BIGINT NOT NULL,
    `parentId` BIGINT NULL,
    `name` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `componentPath` VARCHAR(191) NULL,
    `urlPath` VARCHAR(191) NULL,
    `roleType` INTEGER NOT NULL DEFAULT 1,
    `enable` BOOLEAN NOT NULL DEFAULT false,
    `menuVisible` BOOLEAN NOT NULL DEFAULT true,
    `index` INTEGER NOT NULL DEFAULT 0,
    `is_del` BOOLEAN NOT NULL DEFAULT false,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admin_permission_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
