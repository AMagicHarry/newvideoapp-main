import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { Interview } from '../../interviews/entities/interview.entity';
import * as mongoose from 'mongoose';


@Schema({ timestamps: true })

export class Message extends Document {
    
  @Prop()
  message: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  sent_to: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  sent_from: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Interview' })
  interview_id: Interview;

  @Prop({default: "sent"})
  status: string

}

export const MessageSchema = SchemaFactory.createForClass(Message);
