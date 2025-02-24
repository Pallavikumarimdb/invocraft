import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, enum: ['active', 'inactive'], default: 'active' })
  status: string;

  @Prop()
  address?: string;

  @Prop()
  vatNumber?: string;

  @Prop()
  registrationNumber?: string;

  @Prop({ default: 0 })
  totalInvoices: number;

  @Prop({ default: 0 })
  totalPaid: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer); 