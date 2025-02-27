import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type TenantDocument = Tenant & Document;

@Schema()
export class Tenant {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  users: Types.Array<User>;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
