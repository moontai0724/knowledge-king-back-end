import { SetMetadata } from '@nestjs/common';
import { Role } from '../models/user/user.entity';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
export default Roles;
