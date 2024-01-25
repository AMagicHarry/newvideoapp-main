
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendLinkDto {

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
