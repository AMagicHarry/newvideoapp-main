// import { PartialType } from '@nestjs/mapped-types';
// import { CreateInterviewDto } from './create-interview.dto';

import { IsBoolean, IsDefined, IsMongoId, IsOptional } from 'class-validator';


export class UpdateInterviewDto {

    @IsOptional()
    @IsMongoId()
    question_id: string;

    @IsOptional()
    video_url: string;

    @IsOptional()
    @IsMongoId()
    interviewee: string;

    @IsOptional()
    @IsMongoId()
    job_id: string

    @IsOptional()
    @IsMongoId()
    interviewer: string;

    @IsOptional()
    @IsBoolean()
    favourite: boolean;




}


// export class UpdateInterviewDto extends PartialType(CreateInterviewDto) {}
