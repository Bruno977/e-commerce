import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateProductDetailsDTO {
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

  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'The "discount" field must be a valid number.' },
  )
  @ApiProperty({
    example: 10,
    required: true,
  })
  discount: number;

  @IsNumber({}, { message: 'The "stock" field must be a valid number.' })
  @ApiProperty({
    example: 50,
    required: true,
  })
  stock: number;
}
