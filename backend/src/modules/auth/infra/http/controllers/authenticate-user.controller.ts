import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthenticateUserUseCase } from 'src/modules/auth/application/use-cases/authenticate-user.use-case';
import { AuthenticateUserDto } from '../dto/authenticate-user.dto';
import { Public } from '../../auth/public';
import { ValidationPipe } from '../../../../../lib/common/infra/pipes/validation-pipe';
import { mapAppErrorToHttpException } from 'src/lib/common/http-exceptions/map-app-error-to-http-exception';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/sessions')
@Public()
@ApiTags('User')
export class AuthenticateUserController {
  constructor(private userUseCase: AuthenticateUserUseCase) {}
  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Authenticate a user',
  })
  @ApiResponse({
    status: 200,
    description: 'User authenticated successfully',
  })
  @ApiResponse({ status: 401, description: 'Invalid Credentials' })
  async handle(
    @Body(new ValidationPipe()) authenticateUserDto: AuthenticateUserDto,
  ) {
    const { email, password } = authenticateUserDto;
    const result = await this.userUseCase.execute({
      email,
      password,
    });
    if (result.isLeft()) {
      throw mapAppErrorToHttpException(result.value);
    }
    const { accessToken } = result.value;
    return { access_token: accessToken };
  }
}
