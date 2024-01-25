// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { ROLE } from '../../users/enums/users.enums';

export const Roles = (...roles: ROLE[]) => SetMetadata('roles', roles);
