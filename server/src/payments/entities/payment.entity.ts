// payment.entity.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../users/entities/user.entity';


@Schema({ timestamps: true })
export class Payment extends Document {

  @Prop()
  country: string;

  @Prop()
  expMonth: number;

  @Prop()
  expYear: number;

  @Prop()
  last4: string;

  @Prop()
  cardBrand: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User;

}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
