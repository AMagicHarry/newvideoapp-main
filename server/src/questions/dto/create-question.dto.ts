import { MinLength, IsMongoId, IsNumber, IsOptional } from 'class-validator';

export class CreateQuestionDto {

  @MinLength(6, { message: 'The question must be at least 10 characters long' })
  question: string;

  @IsNumber()
  time_duration: number;

  // @IsMongoId({ message: 'Invalid created_by ID format' })
  // job_id: string;

  @IsOptional()
  user_Id: string;
}
