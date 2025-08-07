import { NotAllowedError } from 'src/lib/common/errors/not-allowed.error';
import { UserRepository } from '../../domain/repositories/user.repository';
import { Hasher } from '../cryptography/hasher';
import { RequestAuthenticateUserDTO } from '../interfaces/authenticate-user.dto';
import { Encrypt } from '../cryptography/encrypt';
import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/lib/common/either/either';

type ResponseRegisterUserUseCase = Promise<
  Either<NotAllowedError, { accessToken: string }>
>;

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher,
    private readonly encrypt: Encrypt,
  ) {}

  async execute({
    email,
    password,
  }: RequestAuthenticateUserDTO): ResponseRegisterUserUseCase {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return left(new NotAllowedError('Invalid credentials'));
    }

    const isSamePassword = await this.hasher.compare(
      password,
      user.password.getValue(),
    );
    if (!isSamePassword) {
      return left(new NotAllowedError('Invalid credentials'));
    }
    const accessToken = await this.encrypt.encrypt({
      sub: user.id.toString(),
      role: user.role.getValue(),
    });
    return right({ accessToken });
  }
}
