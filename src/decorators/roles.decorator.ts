import { SetMetadata } from '@nestjs/common';
import { Role } from '../models/user/user.entity';

export const Roles = (...args: Role[]) => SetMetadata('roles', args);
