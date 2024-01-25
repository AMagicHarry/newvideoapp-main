
import { IsMongoId} from 'class-validator';

export class CreateFavoriteInterviewDto {
  @IsMongoId()
  favoriteInterview: string; 

  @IsMongoId()
  interviewer: string; // User ID who is favoriting the interviews
}
