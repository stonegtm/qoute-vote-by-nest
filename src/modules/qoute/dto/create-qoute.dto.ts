import { IsString, IsNotEmpty } from 'class-validator';

export class CreateQouteDto {
  @IsString()
  @IsNotEmpty()
  qoute: string;
}
