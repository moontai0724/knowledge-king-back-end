import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role, User } from '../models/user/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    const roles = this.reflector.getAllAndMerge<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    const requireRole = roles.length > 0 ? Math.min(...roles) : Role.USER;

    return requireRole <= (user?.permission ?? Role.USER);
  }
}
export default RolesGuard;
