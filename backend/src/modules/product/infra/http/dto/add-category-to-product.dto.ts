import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';

export class AddCategoryToProductDTO {
  @IsArray({ message: 'The "categoryIds" field must be an array of UUIDs.' })
  @IsUUID('4', {
    each: true,
    message: 'Each "categoryId" must be a valid UUID.',
  })
  @ApiProperty({
    example: '["category1","category2"]',
    required: true,
  })
  categoryIds: string[];
}
