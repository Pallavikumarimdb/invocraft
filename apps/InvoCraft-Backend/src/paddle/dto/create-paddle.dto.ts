import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreatePaddleDto {
  @IsString()
  planId: string;  

  @IsString()
  userId: string;  

  @IsNumber()
  @IsOptional()
  quantity?: number;  
}
