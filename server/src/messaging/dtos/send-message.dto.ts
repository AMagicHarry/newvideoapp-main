import { IsOptional } from 'class-validator';

export class SendMessageDto {

  @IsOptional()
  message: string;

  @IsOptional()
  sent_to: number;

  @IsOptional()
  sent_from: number;
  
  @IsOptional()
  interview_id: number;
}