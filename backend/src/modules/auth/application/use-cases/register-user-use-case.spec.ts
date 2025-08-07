import { FakeHasher } from '../../test/cryptography/fake-hasher';
import { InMemoryUserRepository } from '../../test/repositories/in-memory-user.repository';
import { RegisterUserUseCase } from './register-user.use-case';
import { ResourceAlreadyExistsError } from 'src/lib/common/errors/resource-already-exists.error';
import { makeFakeUserData } from '../../test/factories/make-fake-user';

let userRepository: InMemoryUserRepository;
let registerUserUseCase: RegisterUserUseCase;
let fakeHasher: FakeHasher;
describe('RegisterUserUseCase', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    fakeHasher = new FakeHasher();
    registerUserUseCase = new RegisterUserUseCase(userRepository, fakeHasher);
  });
  it('should be able to register a new user', async () => {
    await registerUserUseCase.execute(makeFakeUserData());
    expect(userRepository.users).toHaveLength(1);
  });
  it("should hash user's password upon registration", async () => {
    await registerUserUseCase.execute(
      makeFakeUserData({
        password: '123456',
      }),
    );
    const user = userRepository.users[0];
    expect(user.password.getValue()).toEqual('123456-hashed');
  });
  it('should not be able to register a new user with same email twice', async () => {
    await registerUserUseCase.execute(
      makeFakeUserData({
        email: 'admin@admin.com',
      }),
    );
    const result = await registerUserUseCase.execute(
      makeFakeUserData({
        email: 'admin@admin.com',
      }),
    );
    expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError);
  });
});
