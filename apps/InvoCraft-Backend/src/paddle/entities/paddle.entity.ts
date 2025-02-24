import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Subscription extends Document {
  @Prop({ required: true })
  userId: string; 

  @Prop({ required: true })
  price: string;  

  @Prop({ required: true })
  subscriptionId: string; 

  @Prop({ default: 'active' })
  status: string;  

  @Prop({ required: true })
  planId: string;  

  @Prop({ default: Date.now })
  createdAt: Date;  
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);

