import { IsMongoId, IsOptional, IsArray } from 'class-validator';
export class CreateInterviewerDto {
  @IsArray()
  questions: string[];

  @IsOptional()
  job_title: string

  @IsOptional()
  job_recruiter: string

  @IsOptional()
  @IsMongoId()
  interviewer: string;
}