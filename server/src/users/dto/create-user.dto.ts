import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { ROLE } from '../enums/users.enums';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  confirm_password: string;

  @IsString()
  location: string;

  @IsString()
  company_name: string;

  @Transform(({ value }) => {
    const date = new Date(value);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return formattedDate;
  })
  birth_date: String;

  // @IsEnum(ROLE, { message: 'Invalid user role' })
  // role: ROLE;
}