import { faker } from '@faker-js/faker/.';
import { User, UserProps } from '../../domain/entities/user';
import { UserRole } from '../../domain/enums/user-role.enum';
import { Email } from '../../domain/value-objects/email';
import { Password } from '../../domain/value-objects/password';
import { Role } from '../../domain/value-objects/role';
import { IRequestRegisterUser } from '../../application/interfaces/register-user.dto';

export function makeFakeUser(override: Partial<UserProps> = {}) {
  return User.create({
    email: new Email(faker.internet.email()),
    name: faker.person.fullName(),
    password: new Password(faker.internet.password()),
    role: new Role(UserRole.ADMIN),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    ...override,
  });
}
export function makeFakeUserData(override: Partial<IRequestRegisterUser> = {}) {
  return {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
    role: UserRole.ADMIN,
    ...override,
  };
}
