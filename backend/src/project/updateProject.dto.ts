import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProjectDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  data: string;
}
