import { BIZ_ERROR_CODE } from 'src/constants/http-code';

/** 角色名称已经存在 */
export const ROLE_NAME_EXISTS = {
  code: BIZ_ERROR_CODE,
  msg: '角色名称已经存在',
};

/** 角色不存在 */
export const ROLE_NOT_EXISTS = {
  code: BIZ_ERROR_CODE,
  msg: '角色不存在',
};
