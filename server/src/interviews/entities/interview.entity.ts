import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Job } from '../../jobs/entities/job.entity';
import { User } from '../../users/entities/user.entity';
import { Question } from '../../questions/entities/question.entity';
import { Interviewer } from '../../interviewer/entities/interviewer.entity';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Interview extends Document {
  @Prop([
    {
      question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
      video_url: { type: String },
    },
  ])
  questions: [
    {
      question_id: Question;
      video_url: string;
    },
  ];

  //making link with job
  @Prop({ type: String })
  job_id: string;

  //who is interviewee
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  interviewee: User;

  // Link to Interviewer
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  interviewer: Interviewer;
  
  @Prop({ type: Boolean, default: false })
  favourite: boolean;

}

export const InterviewSchema = SchemaFactory.createForClass(Interview);
