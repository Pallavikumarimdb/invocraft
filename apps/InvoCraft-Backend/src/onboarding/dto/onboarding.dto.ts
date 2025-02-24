import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class OnboardingDto {
  @IsNotEmpty()
  companyName: string;

  @IsNotEmpty()
  companyPhone: string;

  @IsNotEmpty()
  companyEmail: string;

  @IsNotEmpty()
  businessType: string;

  @IsOptional()
  logo?: string;

  @IsNotEmpty()
  streetAddress: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  zipCode: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  taxId: string;

  @IsOptional()
  vatNumber?: string;
} 