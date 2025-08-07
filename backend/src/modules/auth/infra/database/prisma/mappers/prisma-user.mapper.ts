import { Prisma, User as UserPrisma } from '@prisma/client';
import { Id } from 'src/lib/common/entities/id';
import { User } from 'src/modules/auth/domain/entities/user';
import { Email } from 'src/modules/auth/domain/value-objects/email';
import { Password } from 'src/modules/auth/domain/value-objects/password';
import { Role } from 'src/modules/auth/domain/value-objects/role';

export class PrismaUserMapper {
  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      name: user.name,
      email: user.email.getValue(),
      password: user.password.getValue(),
      role: user.role.getValue(),
    };
  }
  static toDomain(raw: UserPrisma): User {
    return new User(
      {
        name: raw.name,
        email: new Email(raw.email),
        password: new Password(raw.password),
        role: new Role(raw.role),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      Id.create(raw.id),
    );
  }
}
