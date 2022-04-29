import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // JWT验证 - Step 3: 处理 jwt 签证
  certificate(user: { name: string; id: bigint }): string {
    const payload = {
      name: user.name,
      id: user.id,
    };
    console.log('JWT验证 - Step 3: 处理 jwt 签证');
    return this.jwtService.sign(payload);
  }
}
