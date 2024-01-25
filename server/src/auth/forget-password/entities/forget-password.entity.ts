// auth/forget-password/forget-password.entity.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class ForgetPassword extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  resetToken: string;

  @Prop({ default: Date.now, expires: 3 * 60 * 60 }) // Token expires in 3 hours 
  createdAt: Date;
}

export const ForgetPasswordSchema = SchemaFactory.createForClass(ForgetPassword);
export type ForgetPasswordDocument = ForgetPassword & Document;
