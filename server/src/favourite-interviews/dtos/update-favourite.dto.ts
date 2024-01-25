
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateFavoriteInterviewDto {
  @IsOptional()
  favoriteInterview?: string; 

  @IsOptional()
  interviewer?: string;
}
