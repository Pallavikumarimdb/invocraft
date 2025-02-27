import { Body, Controller, Post, Get, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './schemas/customer.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Invoice } from '../invoice/schemas/invoice.schema';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto, @Request() req): Promise<Customer> {
    const userId = req.user._id;
    return this.customerService.createCustomer(createCustomerDto, userId);
  }

 
  @Get(':id')
  async getCustomerById(@Param('id') id: string, @Request() req): Promise<Customer> {
    const userId = req.user._id;
    return this.customerService.getCustomerById(id, userId);
  }


  @Get()
  async getAllCustomers(@Request() req): Promise<Customer[]> {
    const userId = req.user._id;
    return this.customerService.getAllCustomers(userId);
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: string, @Request() req): Promise<void> {
    const userId = req.user._id;
    return this.customerService.deleteCustomer(id, userId);
  }

  @Put(':id')
  async updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: Partial<CreateCustomerDto>,
  ): Promise<Customer> {
    return this.customerService.updateCustomerById(id, updateCustomerDto);
  }
} 