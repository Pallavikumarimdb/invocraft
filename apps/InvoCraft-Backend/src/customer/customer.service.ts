import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Types  } from 'mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer, CustomerDocument } from './schemas/customer.schema';
import mongoose from 'mongoose';

@Injectable()
export class CustomerService {
  constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) { }

  async createCustomer(createCustomerDto: CreateCustomerDto, userId: string): Promise<Customer> {
    const customer = new this.customerModel({ ...createCustomerDto, userId });
    return customer.save();
  }


  async getAllCustomers(userId: string): Promise<Customer[]> {
    return this.customerModel.find({ userId }); 
  }

  async getCustomerById(id: string, userId: string): Promise<Customer> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid Customer ID');
    }

    const customer = await this.customerModel.findOne({ _id: id, userId });
    if (!customer) {
      throw new NotFoundException(`Customer with ID "${id}" not found`);
    }

    return customer;
  }


  async deleteCustomer(id: string, userId: string): Promise<void> {
    if (!id || !mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid customer ID');
    }

    const objectId = new mongoose.Types.ObjectId(id as string);
    const result = await this.customerModel.deleteOne({ _id: objectId, userId });

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Customer with id "${id}" not found`);
    }
  }

  async updateCustomerById(id: string, updateCustomerDto: Partial<CreateCustomerDto>): Promise<Customer> {
    const updatedCustomer = await this.customerModel
      .findByIdAndUpdate(id, updateCustomerDto, { new: true })
      .exec();
    if (!updatedCustomer) {
      throw new NotFoundException(`Customer with ID "${id}" not found`);
    }

    return updatedCustomer;
  }
}