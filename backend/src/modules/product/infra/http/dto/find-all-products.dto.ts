import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';

export class FindAllProductsDTO {
  @ApiProperty({
    description: 'Page number for pagination',
    example: 1,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1, { message: 'Page must be at least 1' })
  page?: string;

  @ApiProperty({
    description: 'Number of items per page',
    example: 20,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1, { message: 'Items per page must be at least 1' })
  perPage?: string;
}
