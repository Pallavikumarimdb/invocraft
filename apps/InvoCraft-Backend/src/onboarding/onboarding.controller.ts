import { Body, Controller, Post, Get, Put, Param, UseGuards, Request } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { OnboardingDto } from './dto/onboarding.dto';
import { Onboarding } from './schemas/onboarding.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('onboarding')
@UseGuards(JwtAuthGuard)
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Post()
  async create(@Body() onboardingDto: OnboardingDto, @Request() req): Promise<Onboarding> {
    const userId = req.user._id; 
    return this.onboardingService.createOnboardingData(onboardingDto, userId);
  }

  @Get()
  async getOnboardingData(@Request() req): Promise<Onboarding> {
    const userId = req.user._id;
    return this.onboardingService.getOnboardingData(userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() onboardingDto: OnboardingDto,
    @Request() req
  ): Promise<Onboarding> {
    const userId = req.user._id;
    return this.onboardingService.updateOnboardingData(id, onboardingDto, userId);
  }
  
} 