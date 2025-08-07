import { Entity } from 'src/lib/common/entities/entity';
import { Email } from '../value-objects/email';
import { Password } from '../value-objects/password';
import { Role } from '../value-objects/role';

export interface UserProps {
  name: string;
  email: Email;
  password: Password;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
}
export class User extends Entity<UserProps> {
  protected props: UserProps;

  static create(props: UserProps) {
    const user = new User({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    });
    return user;
  }

  get name() {
    return this.props.name;
  }
  set name(name: string) {
    this.props.name = name;
  }
  get email() {
    return this.props.email;
  }
  get password() {
    return this.props.password;
  }
  get role() {
    return this.props.role;
  }
}
