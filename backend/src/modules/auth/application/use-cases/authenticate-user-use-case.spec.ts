import { NotAllowedError } from 'src/lib/common/errors/not-allowed.error';
import { UserRole } from '../../domain/enums/user-role.enum';
import { FakeHasher } from '../../test/cryptography/fake-hasher';
import { InMemoryUserRepository } from '../../test/repositories/in-memory-user.repository';
import { AuthenticateUserUseCase } from './authenticate-user.use-case';
import { RegisterUserUseCase } from './register-user.use-case';
import { FakeEncrypt } from '../../test/cryptography/fake-encrypt';

let fakeHasher: FakeHasher;
let fakeEncrypt: FakeEncrypt;
let inMemoryRepositoryUser: InMemoryUserRepository;
let registerUserUseCase: RegisterUserUseCase;
let sut: AuthenticateUserUseCase;

describe('AuthenticateUserUseCase', () => {
  beforeEach(() => {
    fakeHasher = new FakeHasher();
    fakeEncrypt = new FakeEncrypt();
    inMemoryRepositoryUser = new InMemoryUserRepository();
    registerUserUseCase = new RegisterUserUseCase(
      inMemoryRepositoryUser,
      fakeHasher,
    );
    sut = new AuthenticateUserUseCase(
      inMemoryRepositoryUser,
      fakeHasher,
      fakeEncrypt,
    );
  });
  it('should be able to authenticate a user', async () => {
    await registerUserUseCase.execute({
      email: 'admin@admin.com',
      name: 'admin',
      password: '123456',
      role: UserRole.ADMIN,
    });
    const userAuth = await sut.execute({
      email: 'admin@admin.com',
      password: '123456',
    });
    expect(userAuth.value).toEqual({
      accessToken: expect.any(String) as string,
    });
  });
  it('should not be able to authenticate a user with wrong password', async () => {
    await registerUserUseCase.execute({
      email: 'admin@admin.com',
      name: 'admin',
      password: '123456',
      role: UserRole.ADMIN,
    });
    const response = await sut.execute({
      email: 'admin@admin.com',
      password: '1234567',
    });
    expect(response.value).toBeInstanceOf(NotAllowedError);
  });
  it('should not be able to authenticate a non-existent user', async () => {
    const response = await sut.execute({
      email: 'admin@admin.com',
      password: '123456',
    });
    expect(response.isLeft()).toBeTruthy();
  });
});
