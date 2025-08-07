import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';

export class RequestRegisterUserControllerDTO {
  @ApiProperty({
    example: 'John Doe',
    required: true,
  })
  @IsString()
  name: string;

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

  @ApiProperty({
    example: 'viewer',
    enum: UserRole,
    required: true,
  })
  @IsEnum(UserRole)
  role: UserRole;
}
