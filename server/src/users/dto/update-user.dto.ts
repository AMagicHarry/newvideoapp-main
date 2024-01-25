import { IsOptional, IsNotEmpty, MinLength } from 'class-validator';
export class UpdateUserDto {

  @IsOptional()
  name: string;
  
  @IsOptional()
  location: string;

  @IsOptional()
  company_name: string;

  @IsOptional()
  birth_date: Date;

  @IsOptional()
  email: string;

  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @IsOptional()
  password: string;

  current_password: string;
}
