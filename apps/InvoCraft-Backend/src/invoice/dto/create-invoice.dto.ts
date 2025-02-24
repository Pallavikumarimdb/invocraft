import { IsNotEmpty, IsString, IsEmail, IsArray, IsOptional, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateInvoiceDto {

  @IsNotEmpty()
  @IsString()
  invoiceNumber: string;

  @IsNotEmpty()
  dateIssued: Date;

  @IsNotEmpty()
  dueDate: Date;

  @IsNotEmpty()
  @IsString()
  customerId: Types.ObjectId;
  
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsString()
  customerAddress: string;

  @IsNotEmpty()
  @IsString()
  customerPhone?: string;

  @IsNotEmpty()
  @IsEmail()
  customerEmail?: string;

  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  companyAddress: string;

  @IsNotEmpty()
  @IsString()
  companyPhone: string;

  @IsNotEmpty()
  @IsEmail()
  companyEmail: string;

  @IsNotEmpty()
  @IsString()
  companyTaxId: string;

  @IsArray()
  @IsOptional()
  items?: {
    description: string;
    quantity: number;
    unitPrice: number;
    tax: number; 
    subtotal: number;
    lineTotal: number;
  }[];

  // @IsNotEmpty()
  // @IsNumber()
  // amount?: number;

  @IsNotEmpty()
  @IsString()
  paymentTerms: string;

  @IsArray()
  @IsOptional()
  paymentMethods?: string[];

  @IsOptional()
  @IsString()
  paymentInstructions?: string;

  @IsOptional()
  @IsString()
  bankDetails?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  terms?: string;
} 