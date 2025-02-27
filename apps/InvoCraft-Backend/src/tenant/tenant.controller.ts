import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { User } from '../dectorators/user.decorator';
import { AuthUser } from '../auth/strategies/jwt.strategy';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  create(@Body() createTenantDto: CreateTenantDto, @User() user: AuthUser) {
    return this.tenantService.create(createTenantDto, user._id.toString());
  }

  @Get()
  findAll(@User() user: AuthUser) {
    return this.tenantService.findAll(user._id.toString());
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: AuthUser) {
    return this.tenantService.findOne(id, user._id.toString());
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTenantDto: UpdateTenantDto,
    @User() user: AuthUser,
  ) {
    return this.tenantService.update(id, updateTenantDto, user._id.toString());
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: AuthUser) {
    return this.tenantService.delete(id, user._id.toString());
  }
}
