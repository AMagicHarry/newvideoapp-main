import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ROLE } from '../enums/users.enums';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  birth_date: String;

  @Prop()
  location: String;

  @Prop()
  company_name: String;

  @Prop()
  profile_image: string;



  // @Prop({ enum: ROLE })
  // role: ROLE;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;

