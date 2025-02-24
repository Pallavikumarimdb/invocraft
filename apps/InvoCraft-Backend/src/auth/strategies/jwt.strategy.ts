import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type AuthPayload = {
  userId: string;
  email: string;
  sub: string;
  tenantId: string;
};
export type AuthUser = {
  _id: string;
  email: string;
  tenantId: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt_secret'),
    });
  }

  async validate(payload: AuthPayload) {
    return {
      _id: payload.sub,
      email: payload.email,
      tenantId: payload.tenantId,
    };
  }
}
