import { BIZ_ERROR_CODE } from 'src/constants/http-code';

/** 权限名称已经存在 */
export const PERMISSION_NAME_EXISTS = {
  code: BIZ_ERROR_CODE,
  msg: '权限名称已经存在',
};

/** 权限不存在 */
export const PERMISSION_NOT_EXISTS = {
  code: BIZ_ERROR_CODE,
  msg: '权限不存在',
};
