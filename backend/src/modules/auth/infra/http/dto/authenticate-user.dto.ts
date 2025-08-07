import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthenticateUserDto {
  @ApiProperty({
    example: 'johndoe@example.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '12345678',
    required: true,
  })
  @IsString()
  password: string;
}
