import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Job } from '../../jobs/entities/job.entity'
import { Question } from '../../questions/entities/question.entity';

@Schema()
export class VideoUploadingEntity extends Document {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Job' })
  job_id: Job;

  @Prop({ required: true })
  interviewee_id: string;
}

export const VideoUploadingEntitySchema = SchemaFactory.createForClass(VideoUploadingEntity);
