import { UserRepository } from '../../domain/repositories/user.repository';
import { ResourceAlreadyExistsError } from 'src/lib/common/errors/resource-already-exists.error';
import { IRequestRegisterUser } from '../interfaces/register-user.dto';
import { User } from '../../domain/entities/user';
import { Hasher } from '../cryptography/hasher';
import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/lib/common/either/either';
import { Email } from '../../domain/value-objects/email';
import { Password } from '../../domain/value-objects/password';
import { Role } from '../../domain/value-objects/role';

type ResponseRegisterUserUseCase = Promise<
  Either<ResourceAlreadyExistsError, { user: User }>
>;

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hasher: Hasher,
  ) {}

  async execute({
    email,
    name,
    password,
    role,
  }: IRequestRegisterUser): ResponseRegisterUserUseCase {
    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (userAlreadyExists) {
      return left(new ResourceAlreadyExistsError('User already exists'));
    }

    const hashedPassword = await this.hasher.hash(password);

    const user = User.create({
      email: new Email(email),
      name,
      password: new Password(hashedPassword),
      role: new Role(role),
    });

    await this.userRepository.create(user);
    return right({ user });
  }
}
