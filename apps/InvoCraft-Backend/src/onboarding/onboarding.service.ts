import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OnboardingDto } from './dto/onboarding.dto';
import { Onboarding, OnboardingDocument } from './schemas/onboarding.schema';
import { Customer } from '../customer/schemas/customer.schema';

@Injectable()
export class OnboardingService {
  constructor(@InjectModel(Onboarding.name) private onboardingModel: Model<OnboardingDocument>) {}

  async createOnboardingData(data: OnboardingDto, userId: string): Promise<Onboarding> {
    const onboardingData = new this.onboardingModel({ ...data, userId });
    return onboardingData.save();
  }

  // This will return an array of Onboarding records for the given userId
async getOnboardingData(userId: string): Promise<Onboarding> {
  const onboardingData = await this.onboardingModel.find({ userId });

  if (!onboardingData || onboardingData.length === 0) {
    throw new Error('Onboarding data not found');
  }

  return onboardingData[0];
}

async updateOnboardingData(id: string, data: OnboardingDto, userId: string): Promise<Onboarding> {
  const onboardingData = await this.onboardingModel.findOneAndUpdate(
    { _id: id, userId },
    { ...data },
    { new: true }
  );

  if (!onboardingData) {
    throw new NotFoundException('Onboarding data not found or you do not have permission to update it');
  }

  return onboardingData;
}
  


} 