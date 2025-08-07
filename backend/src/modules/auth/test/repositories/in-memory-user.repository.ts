import { User } from '../../domain/entities/user';
import { UserRepository } from '../../domain/repositories/user.repository';

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];
  async create(user: User) {
    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email.getValue() === email);
    if (!user) {
      return null;
    }
    return user;
  }
}
