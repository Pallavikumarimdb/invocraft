import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tenant, TenantDocument } from './schemas/tenant.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';

@Injectable()
export class TenantService {
  constructor(
    @InjectModel(Tenant.name) private tenantModel: Model<TenantDocument>,
    private readonly usersService: UsersService,
  ) {}

  // Create a new tenant and associate it with the logged-in user
  async create(
    createTenantDto: CreateTenantDto,
    userId: string,
  ): Promise<Tenant> {
    const createdTenant = new this.tenantModel({
      ...createTenantDto,
      users: [userId],
    });
    const tenant = (await createdTenant.save()).toObject();

    // Update the user to include this tenant
    await this.usersService.addTenantToUser(userId, tenant._id.toString());

    return tenant;
  }

  // Find all tenants associated with the logged-in user
  async findAll(userId: string): Promise<Tenant[]> {
    return this.tenantModel.find({ users: userId }).exec();
  }

  findOne(tenantId: string, userId: string) {
    const userQuery = this.tenantModel.findOne(
      { _id: tenantId, users: userId }, // Ensure user is associated
    );

    return userQuery.exec();
  }

  // Update a tenant if the logged-in user is associated with it
  async update(
    tenantId: string,
    updateTenantDto: any,
    userId: string,
  ): Promise<Tenant> {
    return this.tenantModel.findOneAndUpdate(
      { _id: tenantId, users: userId }, // Ensure user is associated
      updateTenantDto,
      { new: true },
    );
  }
  // Delete a tenant if the logged-in user is associated with it
  async delete(tenantId: string, userId: string): Promise<any> {
    return this.tenantModel.deleteOne({ _id: tenantId, users: userId });
  }
}
