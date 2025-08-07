import { UserRole } from '../../domain/enums/user-role.enum';

export class IRequestRegisterUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
