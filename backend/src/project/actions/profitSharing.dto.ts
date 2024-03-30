import { IsNotEmpty, IsString } from 'class-validator';

export class ProfitSharingDto {
  @IsNotEmpty()
  @IsString()
  contractAddress: string;

  @IsNotEmpty()
  @IsString()
  amount: string;
}
