import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from 'src/config/jwt';
import { JwtStrategy } from 'src/guard/jwt/jwt.strategy';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '8h' }, // token 过期时效, TODO 改成 4week
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [],
  exports: [AuthService],
})
export class AuthModule {}
