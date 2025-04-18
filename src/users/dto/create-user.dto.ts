import { IsEmail, IsString, MinLength, IsNotEmpty, Validate } from 'class-validator';
import { IsMatchingPassword } from '../validators/password-match.validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IsMatchingPassword, ['password'])
  confirmPassword: string;
} 