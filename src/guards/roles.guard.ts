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

    const requireRoles = this.reflector.getAllAndOverride<Role[]>(
      'requireRole',
      [context.getHandler(), context.getClass()],
    ) || [Role.ADMIN, Role.AUDITOR, Role.USER];

    return Math.min(...requireRoles) <= (user?.permission ?? Role.USER);
  }
}
