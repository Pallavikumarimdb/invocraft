import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Tenant } from '../../tenant/schemas/tenant.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop({ select: false })
  public password: string;

  @Prop({ required: true, lowercase: true, unique: true })
  email: string;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Tenant' }] })
  tenants: Types.Array<Tenant>;
}

export const UserSchema = SchemaFactory.createForClass(User);
