import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OnboardingDocument = Onboarding & Document;

@Schema()
export class Onboarding {
  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  companyPhone: string;

  @Prop({ required: true })
  companyEmail: string;

  @Prop({ required: true })
  businessType: string;

  @Prop()
  logo?: string;

  @Prop({ required: true })
  streetAddress: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  zipCode: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  taxId: string;

  @Prop()
  vatNumber?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export const OnboardingSchema = SchemaFactory.createForClass(Onboarding); 