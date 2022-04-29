import { PARAMS_ERROR } from './../constants/http-code';
import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { BizException } from 'src/utils/BizException';

/**
 * 参数校验
 */
@Injectable()
export class ParamsValidationPipe implements PipeTransform {
  async transform<T>(value: T, metadata: ArgumentMetadata): Promise<T> {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const firstError = errors[0];
      const { constraints } = firstError;
      const keys = Object.keys(constraints);

      throw new BizException({
        code: PARAMS_ERROR.code,
        msg: constraints[keys[0]], // TODO: 生产环境不要给具体的错误
      });
    }

    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];

    return !types.find((type) => metatype === type);
  }
}
