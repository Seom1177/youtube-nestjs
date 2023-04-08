import { Max, Min, IsInt, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsInt()
  @Max(999)
  @Min(1)
  price: number;
  
  @IsString()
  description: string;
}
