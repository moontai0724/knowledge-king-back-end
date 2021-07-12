import { SetMetadata } from '@nestjs/common';
import { Role } from '../models/user/user.entity';

export const RequireRole = (role: Role) => SetMetadata('requireRole', role);
