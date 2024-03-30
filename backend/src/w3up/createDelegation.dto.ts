import { IsNotEmpty, IsString } from 'class-validator';

export class createDelegationDto {
  @IsNotEmpty()
  @IsString()
  did: string;
}
