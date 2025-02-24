import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '@/auth/auth.service';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async create(user: any): Promise<User | HttpException> {
    let hashedPassword;
    if (user.password) {
      hashedPassword = await this.authService.getHashedPassword(user.password);
    }
    user.password = hashedPassword;
    const newUser = new this.userModel(user);
    try {
      const savedUser = (await newUser.save()).toObject();
      delete savedUser.password; // Remove password before returning

      return savedUser;
    } catch {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(
    query: Record<string, unknown>,
    withPassword = false,
  ): Promise<UserDocument | undefined> {
    const userQuery = this.userModel.findOne(query);

    if (withPassword) {
      userQuery.select('+password'); // Include password if withPassword is true
    }

    return userQuery.exec();
  }

  async updateOne(query: Record<string, unknown>, update: any): Promise<User> {
    return this.userModel.findOneAndUpdate(query, update);
  }

  // Add a tenant reference to a user
  async addTenantToUser(userId: string, tenantId: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { tenants: tenantId } },
      { new: true },
    );
  }
}
