import { left, right } from '../../../../lib/common/either/either';
import { Either } from 'src/lib/common/either/either';
import { UserRole } from '../enums/user-role.enum';
import { InvalidValueError } from 'src/lib/common/errors/invalid-value-error';

export class Role {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
  }

  getValue(): UserRole {
    return this._value as UserRole;
  }

  static create(value: string): Either<InvalidValueError, Role> {
    if (!this.isValid(value)) {
      return left(new InvalidValueError(`Invalid role: ${value}`));
    }
    return right(new Role(value));
  }

  static isValid(value: string): boolean {
    return Object.values(UserRole).includes(value as UserRole);
  }
}
