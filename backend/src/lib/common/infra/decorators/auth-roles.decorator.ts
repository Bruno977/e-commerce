import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { UserRole } from 'src/modules/auth/domain/enums/user-role.enum';

export function AuthRoles(...roles: UserRole[]) {
  return applyDecorators(Roles(...roles), UseGuards(RolesGuard));
}
