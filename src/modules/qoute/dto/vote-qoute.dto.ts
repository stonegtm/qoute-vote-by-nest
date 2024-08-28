import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class VoteQouteDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  user_id?: string;
}
