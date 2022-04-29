import { BIZ_ERROR_CODE } from 'src/constants/http-code';

/** 用户已经存在 */
export const USER_NAME_EXISTS = {
  code: BIZ_ERROR_CODE,
  msg: '用户已经存在',
};

/** 用户不存在 */
export const USER_NOT_EXISTS = {
  code: BIZ_ERROR_CODE,
  msg: '用户不存在',
};

/** 密码错误 */
export const PWD_IS_ERROR = {
  code: BIZ_ERROR_CODE,
  msg: '密码错误',
};
