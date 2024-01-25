import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/entities/user.entity'
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Job extends Document {
    
    @Prop()
    job_title: string;

    @Prop()
    company_name: string;

    @Prop()
    location: string;


}



export const JobSchema = SchemaFactory.createForClass(Job)