import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Job } from '../../jobs/entities/job.entity'
import { User } from '../../users/entities/user.entity'
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Interviewer extends Document {
  @Prop({ type: [{ type: 'ObjectId', ref: 'Question' }] })
  questions: string[]; // Array of post IDs

  //making link with job
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Job' })
  job_id: Job;

  @Prop()
  job_title: string;

  @Prop()
  job_recruiter: string

  //who is interviewee
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  // interviewee: User;

  //who is interviewer
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  interviewer: User;

  @Prop()
  share_link: string;
}

export const InterviewerSchema = SchemaFactory.createForClass(Interviewer);