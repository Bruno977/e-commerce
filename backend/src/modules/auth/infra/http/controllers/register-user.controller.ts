import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RegisterUserUseCase } from 'src/modules/auth/application/use-cases/register-user.use-case';
import { ValidationPipe } from '../../../../../lib/common/infra/pipes/validation-pipe';
import { RequestRegisterUserControllerDTO } from '../dto/register-user.dto';
import { Public } from '../../auth/public';
import { mapAppErrorToHttpException } from 'src/lib/common/http-exceptions/map-app-error-to-http-exception';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/accounts')
@Public()
@ApiTags('User')
export class RegisterUserController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Register a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
  })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async handle(
    @Body(new ValidationPipe())
    requestRegisterUserDto: RequestRegisterUserControllerDTO,
  ) {
    const { name, email, password, role } = requestRegisterUserDto;
    const result = await this.registerUserUseCase.execute({
      name,
      email,
      password,
      role,
    });
    if (result.isLeft()) {
      throw mapAppErrorToHttpException(result.value);
    }
  }
}
