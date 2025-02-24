import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type InvoiceDocument = Invoice & Document;

@Schema()
export class Invoice {

  @Prop({ required: true })
  invoiceNumber: string;

  @Prop({ required: true })
  dateIssued: Date;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  customerAddress: string;

  @Prop()
  customerPhone: string;

  @Prop()
  customerEmail: string;

  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  companyAddress: string;

  @Prop({ required: true })
  companyPhone: string;

  @Prop({ required: true })
  companyEmail: string;

  @Prop({ required: true })
  companyTaxId: string;

  @Prop({ type: [Object], default: [] }) // Array of invoice items
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    tax: number; // Tax rate as a decimal (e.g., 0.1 for 10%)
    subtotal: number;
    lineTotal: number;
  }[];

  @Prop({ default: 0 })
  subtotal: number;

  @Prop({ default: 0 })
  taxAmount: number;

  @Prop({ default: 0 })
  amount: number;

  @Prop({ required: true })
  paymentTerms: string;

  @Prop({ type: [String], default: [] })
  paymentMethods: string[];

  @Prop()
  paymentInstructions?: string;

  @Prop()
  bankDetails?: string;

  @Prop()
  notes?: string;

  @Prop()
  terms?: string;

  @Prop({ required: true, enum: ['pending', 'paid', 'overdue'], default: 'pending' })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) 
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true }) 
  customerId: Types.ObjectId; 
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice); 