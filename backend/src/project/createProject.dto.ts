import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  video: string;

  @IsNotEmpty()
  @IsString()
  user_contract_id: string;

  @IsNotEmpty()
  @IsString()
  category: string[];

  @IsNotEmpty()
  @IsString()
  subCategory: string[];

  @IsNotEmpty()
  @IsString()
  goal: string;
}
