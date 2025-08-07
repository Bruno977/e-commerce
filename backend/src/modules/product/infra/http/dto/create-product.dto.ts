import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsString,
  IsUUID,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateProductControllerDTO {
  @IsString({ message: 'The "name" field must be a string.' })
  @ApiProperty({
    example: 'Sample Product',
    required: true,
  })
  name: string;

  @IsString({ message: 'The "description" field must be a string.' })
  @ApiProperty({
    example: 'This is a detailed description of the product.',
    required: true,
  })
  description: string;

  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'The "price" field must be a valid number.' },
  )
  @ApiProperty({
    example: 100,
    required: true,
  })
  price: number;

  @IsNumber({}, { message: 'The "stock" field must be a valid number.' })
  @ApiProperty({
    example: 50,
    required: true,
  })
  stock: number;

  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'The "discount" field must be a valid number.' },
  )
  @ApiProperty({
    example: 10,
    required: true,
  })
  discount: number;

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

  @IsBoolean({ message: 'The "isActive" field must be a boolean.' })
  @IsOptional()
  @ApiProperty({
    example: true,
    required: false,
  })
  isActive: boolean = true;
}
