import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * 业务异常类
 */
export class BizException extends HttpException {
  constructor({ code, msg }: { code: number; msg: string }) {
    super({ code, msg }, HttpStatus.OK);
  }
}
