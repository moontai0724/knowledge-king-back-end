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

    const requireRoles = this.reflector.getAllAndMerge<Role[]>('requireRole', [
      context.getHandler(),
      context.getClass(),
    ]);

    return (
      (requireRoles.length > 0 ? Math.min(...requireRoles) : Role.USER) <=
      (user?.permission ?? Role.USER)
    );
  }
}
