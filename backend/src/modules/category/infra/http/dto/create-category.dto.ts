import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateCategoryDTO {
  @ApiProperty({
    example: 'Electronics',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Category for electronic products',
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'true',
    required: false,
    default: true,
  })
  @IsBoolean()
  isActive: boolean = true;
}
