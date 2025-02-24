import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmailVerificationDocument = HydratedDocument<EmailVerification>;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class EmailVerification {
  @Prop({ required: true, unique: true })
  emailToken: string;

  @Prop({ required: true, lowercase: true })
  email: string;
}

export const EmailVerificationSchema =
  SchemaFactory.createForClass(EmailVerification);
