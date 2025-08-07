import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateCategoryDTO {
  @ApiProperty({
    example: 'Electronics updated',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Category for electronic products updated',
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
