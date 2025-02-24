import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';
import { User } from '@/users/schemas/user.schema';
import { AuthPayload } from './strategies/jwt.strategy';
import { isValidObjectId } from 'mongoose';
import { CreateUserDto } from '@/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  generateJwt(payload) {
    return this.jwtService.sign(payload);
  }

  async registerUser(user: CreateUserDto) {
    try {
      const newUser = (await this.usersService.create(user)) as User;

      return this.generateJwt({
        sub: newUser,
        email: newUser.email,
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async getHashedPassword(password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  }

  // compare password
  async comparePasswords(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ email }, true);

    if (user.password) {
      return bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            const newUser = user.toObject();
            return newUser;
          }
          return false;
        })
        .catch((err) => err);
    }
    return user;
  }

  async generateOtp(size = 6): Promise<string> {
    return await crypto.randomBytes(size).toString('hex');
  }

  async findUserByEmail(email) {
    const user = await this.usersService.findOne({ email });

    if (!user) {
      return null;
    }

    return user;
  }

  async login(user: User) {
    const userExists = await this.findUserByEmail(user.email);

    if (!userExists) {
      return this.registerUser(user);
    }
    const activeTenant = user.tenants?.[0];

    const tenantId = isValidObjectId(activeTenant)
      ? activeTenant.toString()
      : activeTenant?._id.toString();

    const payload: AuthPayload = {
      email: userExists.email,
      userId: userExists._id.toString(),
      sub: userExists._id.toString(),
      tenantId: tenantId,
    };
    return {
      access_token: this.generateJwt(payload),
    };
  }

  async switchTenant(userId: string, newTenantId: string) {
    const user = await this.usersService.findOne({ _id: userId.toString() });

    // Check if the user is associated with the new tenant
    if (!(user.tenants as any).includes(newTenantId)) {
      throw new UnauthorizedException(
        'User is not associated with this tenant',
      );
    }

    // Generate a new token with the updated active tenant ID
    const payload = {
      sub: user._id,
      email: user.email,
      activeTenantId: newTenantId,
    };

    return {
      access_token: this.generateJwt(payload),
    };
  }
}
