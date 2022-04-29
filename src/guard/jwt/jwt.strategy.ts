import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from 'src/config/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('auth'),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // JWT验证 - Step 4: 被守卫调用
  async validate(payload: any) {
    console.log(`JWT验证 - Step 4: 被守卫调用`);
    return {
      id: payload.id,
      name: payload.name,
    };
  }
}
