import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDelegationDto {
  @IsNotEmpty()
  @IsString()
  did: string;
}
