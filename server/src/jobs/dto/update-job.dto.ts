import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, MinLength, IsMongoId } from 'class-validator';

export class UpdateJobDto {

    @IsOptional()
    @MinLength(6, { message: 'The job title must be at least 6 characters long' })
    job_title: string;

    @IsOptional()
    company_name: string;

    @IsOptional()
    location: string;

    // @IsOptional()
    // @IsMongoId({ message: 'Invalid created_by ID format' })
    // created_by: string;
}
