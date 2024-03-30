import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class updateUserDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  biography: string;

  @IsNotEmpty()
  @IsEmail()
  image: string;

  @IsNotEmpty()
  @IsString()
  location: string;
}
