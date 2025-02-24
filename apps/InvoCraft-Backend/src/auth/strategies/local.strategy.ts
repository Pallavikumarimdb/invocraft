import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.comparePasswords(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    // Check if the user has no password set and is an OAuth user
    if (!user.password) {
      throw new UnauthorizedException(
        'This account was created with Google. Please use Google Sign-In.',
      );
    } else {
      delete user.password;
    }

    return user;
  }
}
