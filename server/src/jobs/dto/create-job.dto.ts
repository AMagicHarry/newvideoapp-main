import { IsOptional, IsString, MinLength, IsDateString, IsEnum, IsMongoId } from 'class-validator';

export class CreateJobDto {
    @MinLength(6, { message: 'The job title must be at least 6 characters long' })
    job_title: string;

    @IsString()
    company_name: string;

    @IsString()
    location: string;

    // @IsOptional()
    // @IsMongoId({ message: 'Invalid created_by ID format' })
    // created_by: string;
}