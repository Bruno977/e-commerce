import { Module } from '@nestjs/common';
import { RegisterUserController } from './controllers/register-user.controller';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { AuthenticateUserController } from './controllers/authenticate-user.controller';
import { AuthenticateUserUseCase } from '../../application/use-cases/authenticate-user.use-case';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [RegisterUserController, AuthenticateUserController],
  providers: [RegisterUserUseCase, AuthenticateUserUseCase],
})
export class AuthHttpModule {}
