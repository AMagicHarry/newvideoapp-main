// import { PartialType } from '@nestjs/mapped-types';
// import { CreateQuestionDto } from './create-question.dto';

import { MinLength, IsMongoId, IsNumber, IsOptional } from 'class-validator';

export class UpdateQuestionDto {


    @IsOptional()
    @MinLength(6, { message: 'The question must be at least 10 characters long' })
    question: string;

    @IsOptional()
    @IsNumber()
    time_duration: number;

    // @IsOptional()
    // @IsMongoId({ message: 'Invalid created_by ID format' })
    // job_id: string;
   
    @IsOptional()
    user_Id: string;
  
}

// export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}
