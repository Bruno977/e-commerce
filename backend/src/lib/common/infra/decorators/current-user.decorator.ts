import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/modules/auth/infra/auth/jwt.strategy';

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: JwtPayload }>();
    return request.user;
  },
);
