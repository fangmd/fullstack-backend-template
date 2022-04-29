/**
 * 结果相关函数
 */

import { SUCCESS_CODE } from 'src/constants/http-code';

interface ResponseErrorArgs {
  code: number;
  data?: any;
  msg: string;
}

/**结果返回类 */
export class HttpResponse {
  code: number;
  msg: string;
  data?: any;

  constructor({ code, data, msg }) {
    this.code = code;
    this.data = data;
    this.msg = msg;
  }

  get isSuccess() {
    return this.code === SUCCESS_CODE;
  }
}

/**请求成功 */
export const responseSuccess = (data?, msg = 'success'): HttpResponse => {
  return new HttpResponse({ code: SUCCESS_CODE, data, msg });
};

/**请求失败 */
export const responseError = ({
  code,
  data,
  msg,
}: ResponseErrorArgs): HttpResponse => {
  return new HttpResponse({ code, data, msg });
};
