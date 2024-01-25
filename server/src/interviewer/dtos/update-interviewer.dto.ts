import { IsMongoId, IsOptional } from 'class-validator';
export class UpdateInterviewerDto {
  @IsOptional()
  @IsMongoId()
  question_id: string;

  @IsOptional()
  job_title: string

  @IsOptional()
  job_recruiter: string


  @IsOptional()
  @IsMongoId()
  interviewer: string;
}